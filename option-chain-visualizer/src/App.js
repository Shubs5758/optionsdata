import React, { useState } from "react";
import SymbolInput from "./SymbolInput";
import ChartComponent from "./ChartComponent";

const App = () => {
  const [symbol, setSymbol] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSymbolSubmit = (symbol, strikePrice, expiryDate) => {
    setSymbol(symbol);
    setStrikePrice(strikePrice);
    setExpiryDate(expiryDate);
  };

  const divStyle = {
    // backgroundImage:
    //   "url(https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/uk/advisor/wp-content/uploads/2023/05/Trading_photo.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // Full height of the viewport
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const divStyles = {
    height: "600px", // Increase the height as needed
    width: "800px", // Increase the width as needed
  };
  return (
    <div>
      <div style={divStyle}>
        <SymbolInput onSubmit={handleSymbolSubmit} />
        {symbol && strikePrice && expiryDate && (
          <ChartComponent
            style={divStyles}
            symbol={symbol}
            strikePrice={strikePrice}
            expiryDate={expiryDate}
          />
        )}
      </div>
    </div>
  );
};

export default App;
