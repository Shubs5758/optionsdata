import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels"; // Import the plugin

const ChartComponent = ({ symbol, strikePrice, expiryDate }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(symbol,strikePrice,expiryDate)
        const url = `http://localhost:5000/option-data?symbol=${symbol}&strikeprice=${strikePrice}&expiryDate=${expiryDate}`;
        const response = await axios.get(url);
        const data = response.data;
        console.log("Data:", data);
        const chartdata = data.map((record) => ({
          strikePrice: record.strikePrice,
          CE: record.CE,
          PE: record.PE,
        }));
        console.log("chartdata", chartdata);

        setChartData(chartdata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching option data:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Update data every 2 minutes
    const intervalId = setInterval(fetchData, 2 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [symbol, strikePrice, expiryDate]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy existing chart instance
      }

      const newChartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: [strikePrice.toString()],
          datasets: [
            {
              label: "CE",
              data: chartData
                .filter(
                  (record) =>
                    record.CE !== undefined &&
                    record.CE.openInterest !== undefined
                )
                .map((record) => ({
                  x: strikePrice.toString(),
                  y: record.CE.openInterest,
                  label: record.CE.openInterest.toString(),
                })),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "lightgreen",
              tension: 0.1,
            },
            {
              label: "PE",
              data: chartData
                .filter(
                  (record) =>
                    record.PE !== undefined &&
                    record.PE.openInterest !== undefined
                )
                .map((record) => ({
                  x: strikePrice.toString(),
                  y: record.PE.openInterest,
                  label: record.PE.openInterest.toString(),
                })),
              fill: false,
              borderColor: "rgb(192, 75, 192)",
              backgroundColor: "rgba(192, 75, 75, 0.2)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              ticks: {
                suggestedMax: 1000, // Adjust this value as needed
                precision: 0, // Optional: Set the number of decimal places for the tick labels
              },
            },
          },
          plugins: {
            datalabels: {
              display: true,
              color: "black",
              font: {
                weight: "bold",
              },
            },
          },
          responsive: true,
        },
      });

      setChartInstance((prevChartInstance) => {
        if (prevChartInstance) {
          prevChartInstance.destroy(); // Destroy previous chart instance
        }
        return newChartInstance;
      });
    }
  }, [chartData, strikePrice]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!chartData) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div  >
      <h2 className="text-center mb-4 text-opacity-30">Option Chart</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};


export default ChartComponent;
