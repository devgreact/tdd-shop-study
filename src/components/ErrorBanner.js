import React from "react";

const ErrorBanner = ({ message }) => {
  let errMessage = message || "에러가 발생했습니다.";
  return (
    <div
      data-testid="error-banner"
      style={{ backgroundColor: "red", color: "#fff" }}
    >
      {errMessage}
    </div>
  );
};

export default ErrorBanner;
