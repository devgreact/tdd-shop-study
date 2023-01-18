import React from "react";

const Option = ({ name }) => {
  return (
    <form>
      <input type="checkbox" id={name} />
      <label htmlFor={name}>{name}</label>
    </form>
  );
};

export default Option;
