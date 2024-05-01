import React, { useState } from "react";

import "./symbolinput.css";

const SymbolInput = ({ onSubmit }) => {
  const [symbol, setSymbol] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "symbol") {
      setSymbol(value);
    } else if (name === "strikePrice") {
      setStrikePrice(value);
    } else if (name === "expiryDate") {
      setExpiryDate(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(symbol, strikePrice, expiryDate);
  };

  // return (
  //   <form  onSubmit={handleSubmit}>
  //     <input
  //       type="text"
  //       name="symbol"
  //       value={symbol}
  //       onChange={handleChange}
  //       placeholder="Enter symbol..."
  //     />
  //     <input
  //       type="text"
  //       name="strikePrice"
  //       value={strikePrice}
  //       onChange={handleChange}
  //       placeholder="Enter strike price..."
  //     />
  //     <input
  //       type="text"
  //       name="expiryDate"
  //       value={expiryDate}
  //       onChange={handleChange}
  //       placeholder="Enter expiry date..."
  //     />
  //     <button type="submit" >
  //       Submit
  //     </button>
  //   </form>
  // );
  //create input field for symbol and strike price and expiry date also provide css

  return (
    <div className="top-centered-div">
      <h1 className="fontweight-bold font-bold mt-5">Option Chain Data</h1>

      <div className="flex-container flex-wrap ">
        <input
          className="styled-input mt-4"
          type="text"
          name="symbol"
          value={symbol}
          onChange={handleChange}
          placeholder="Enter symbol..."
        />
        <input
          className="styled-input  mt-4 "
          type="text"
          name="strikePrice"
          value={strikePrice}
          onChange={handleChange}
          placeholder="Enter strike price..."
        />
        <input
          className="styled-input  mt-4 "
          type="text"
          name="expiryDate"
          value={expiryDate}
          onChange={handleChange}
          placeholder="Enter expiry date..."
        />
        <div className="mt-2">
          <button onClick={handleSubmit} className="centered-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymbolInput;
