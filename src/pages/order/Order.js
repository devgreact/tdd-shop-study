import React from "react";
import Type from "./Type";
const Order = () => {
  return (
    <div>
      <h1>제품 주문</h1>
      <div style={{ border: "5px solid #000" }}>
        <Type orderType="products" />
      </div>
      <div style={{ display: "flex", marginTop: 20, border: "5px solid #000" }}>
        <div style={{ border: "5px solid #000", width: "50%" }}>
          <h2>제품 옵션</h2>
          <Type orderType="options" />
        </div>
        <div style={{ border: "5px solid #000", width: "50%" }}>
          <h2>전체 금액:</h2>
          <br />
          <button>주문</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
