import { render } from "@testing-library/react";
import { OrderContextProvider } from "./context/OrderContext";

// ui : 렌더링하고자 하는 jsx
// options : wrapper 옵션 이외에 우리가 주고자하는 다른 옵션들 
const customRender = (ui, options) =>
  render(ui, { wrapper: OrderContextProvider, ...options });

export * from "@testing-library/react";

export { customRender as render };
