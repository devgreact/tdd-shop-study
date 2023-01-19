import React from "react";

const Option = ({ name, updateItemCount }) => {
  return (
    <form>
      <input
        type="checkbox"
        id={`${name} option`}
        onChange={(e) => {
          updateItemCount(name, e.target.checked ? 1 : 0);
        }}
      />{" "}
      {/* 수정 진행 */}
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
};

export default Option;
