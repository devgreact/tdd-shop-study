import React from "react";

//05-9
const Option = ({ name, updateItemCount }) => {
  return (
    <form>
      {/* 05-10 */}
      <input
        type="checkbox"
        id={`${name} option`}
        onChange={(e) => {
          updateItemCount(name, e.target.checked ? 1 : 0);
        }}
      />{" "}
      {/* 05-11 Type.js 로 이동 */}
      <label htmlFor={name}>{name}</label>
    </form>
  );
};

export default Option;
