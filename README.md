# 상품 판매 관련 설정 07 모든 테스트 케이스를 wrapper 로 감싸주기

이전 내용에서 테스트 케이스에서 context 가 필요했기 때문에 wrapper 로 감싸주었다. 현재 다른 테스트들도 실행해 보면 context 가 필요하기 때문에 에러가 난다. 하지만 모든 케이스에 하나 하나 wrapper 를 주는 것은 불편하기 때문에 Custom Render 를 만들어서 사용해 준다.

https://testing-library.com/docs/react-native-testing-library/setup/#custom-render

## 커스텀 랜더 만들기 src/test-utils.js

```js
import { render } from "@testing-library/react";
import { OrderContextProvider } from "./context/OrderContext";

// ui : 렌더링하고자 하는 jsx
// options : wrapper 옵션 이외에 우리가 주고자하는 다른 옵션들
const customRender = (ui, options) =>
  render(ui, { wrapper: OrderContextProvider, ...options });

export * from "@testing-library/react";

export { customRender as render };
```

## OrderContext.js

```js
setTotals({
  products: productsTotal,
  options: optionsTotal,
  total: total,
});
```

## Calcurate.test.js

```js
// 새로 가져옴
import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import Type from "../Type";

// 상품 가격을 위한 테스트
// 가격은 1000원, 옵션은 500원으로 생각하고 코드
test("상품 선택 변경시 가격 계산 테스트", async () => {
  // 원래대로 돌려줌
  render(<Type orderType="products" />);

  // 상품 총 가격 부분
  const productsTotal = screen.getByText("총 가격:", { exact: false });
  expect(productsTotal).toHaveTextContent("0");

  // Good1 제품 1개 올리기
  // 1000 원이 된다.
  // roll 은 spinbutton 이다.
  const good1 = await screen.findByRole("spinbutton", {
    name: "Good1",
  });

  // 기존에는 fireEvent 를 사용했다. 이번에는 userEvent 를 활용한다.
  // input 이나 textarea 에 텍스트를 선택(select) 한 후 제거(delete) 해줍니다.
  // 하지만 현재 소스 코드 보다 위에서 같은 엘리먼트를 위한 userEvent를 사용했다면 clrea 해 준후에
  // uxerEvent.type() 을 사용하는 것이 좋습니다.
  userEvent.clear(good1);
  userEvent.type(good1, "1");
  expect(productsTotal).toHaveTextContent("1000");
});
```

## Type.test.js

```js
// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils";
import Type from "../Type";
// 서버통신 체크
import { server } from "../../../mocks/server";
import { rest } from "msw";

// order Type 테스트
test("Order 상품 출력 테스트", async () => {
  render(<Type orderType="products" />);
  // 서버 호출 이미지 정보 출력
  // 비동기 방식의 여러개의 태그를 테스트
  let imgElement = await screen.findAllByRole("img", {
    name: /product$/i,
  });
  expect(imgElement).toHaveLength(2);

  // img 태그에 alt 키에 대한 값이 정상인지 테스트
  let altText = imgElement.map((element) => element.alt);
  expect(altText).toEqual(["Good1 product", "Good2 product"]);
});
// 서버통신 에러
test("서버 통신 에러 테스트", async () => {
  server.resetHandlers(
    rest.get("http://localhost:5000/products", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<Type orderType="products" />);
  const errBanner = await screen.findByTestId("error-banner");
  expect(errBanner).toHaveTextContent("에러가 발생했습니다.");
});

// 옵션 정보 가져오기
test("옵션 정보 출력 테스트", async () => {
  render(<Type orderType="options" />);
  const optionCheckboxes = await screen.findAllByRole("checkbox");
  expect(optionCheckboxes).toHaveLength(2);
});
```
