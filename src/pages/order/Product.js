import React from "react";

//05-5
const Product = ({ name, imagePath, updateItemCount }) => {
  //05-7
  const handleChange = (event) => {
    const currentValue = event.target.value;
    updateItemCount(name, currentValue);
  };
  //05-8 옵션으로이동

  return (
    <div style={{ textAlgin: "center" }}>
      <img
        style={{
          width: "75%",
        }}
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} product`}
      />

      <form style={{ marginTop: 10 }}>
        <label htmlFor={name} style={{ textAlign: "right" }}>
          {name}
        </label>

        <input
          id={name}
          style={{ marginLeft: 7 }}
          type="number"
          name="quantity"
          min="0"
          defaultValue={0}
          // 05-6
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Product;
