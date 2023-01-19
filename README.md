# 상품 판매 관련 설정 06 에러 처리하기

## Calcurate.test.js

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// 추가
import { OrderContextProvider } from "../../../context/OrderContext";
import Type from "../Type";

// 상품 가격을 위한 테스트
// 가격은 1000원, 옵션은 500원으로 생각하고 코드
test("상품 선택 변경시 가격 계산 테스트", async () => {
  // 1. OrderContextProvider 적용
  // 실제 코드는 OrderContextProvider로 감싸주었지만, 테스트 부분에서는 감싸주지 않기 때문에 Context를
  // 사용할 때 에러가 발생
  // npm test 실행 이후
  // p 를 입력하면 특정 항목만 test 가능하다.

  // 2. 오류 수정 오타 orderType
  render(<Type orderType="products" />, { wrapper: OrderContextProvider });

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

## OrderContext.js

```js
setTotals({
  products: productsTotal,
  options: optionsTotal,
  total: total,
});
```
