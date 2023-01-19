# 상품 판매 관련 설정 08 옵션 가격을 위한 테스트구현

context 를 이용해서 상품 가격을 계산하고 그에 대한 테스트도 구현하였다.
그래서 이번에는 옵션 가격을 위한 테스트를 구현하겠다.

## Calcurate.test.js

```js
import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import Type from "../Type";

// 상품 가격을 위한 테스트
// 가격은 1000원, 옵션은 500원으로 생각하고 코드
test("상품 선택 변경시 가격 계산 테스트", async () => {
  // 원래대로 돌려줌
  render(<Type orderType="products" />);

  // 상품 총 가격 부분
  const productsTotal = screen.getByText("상품 총 가격:", { exact: false });
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

// 옵션 정보 업데이트 테스트
// 01 Option.js 로 이동
test("옵션 선택 변경시 가격 계산 테스트", async () => {
  render(<Type orderType="options" />);

  const optionsTotal = screen.getByText("옵션 총 가격:", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "option1",
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent("500");

  const optionCheckbox = await screen.findByRole("checkbox", {
    name: "option2",
  });
  userEvent.click(optionCheckbox);
  expect(optionsTotal).toHaveTextContent("1000");

  userEvent.click(optionCheckbox);
  expect(optionsTotal).toHaveTextContent("500");
});
```

## Type.js

```js
// 05-3 useContext 에서 가져옴
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Option from "./Option";
import ErrorBanner from "../../components/ErrorBanner";

// 05-2 contxt 불러들이기
import { OrderContext } from "../../context/OrderContext";

// orderType="products"  orderType="options"
const Type = ({ orderType }) => {
  // 서버에서 들어온 데이터 저장
  const [items, setItems] = useState([]);
  // 서버 에러 표시
  const [error, setError] = useState(false);

  // 05-1 context 를 가져온다.
  // 05-3 contxt 사용
  const [orderDatas, updateItemCount] = useContext(OrderContext);

  //  외부 데이터 호출 시 useEffect 사용
  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      // console.log(error);
      setError(true);
    }
  };
  // 서버 에러 시 경고창 출력
  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const ItemComponents = orderType === "products" ? Product : Option;

  const showItemArr = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      // 05-4 contxt 사용
      // Product 컴포넌트로 이동
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, orderType)
      }
    />
  ));

  let orderTypeWord = orderType === "products" ? "상품" : "옵션";

  return (
    <div>
      <h2>제품 종류</h2>
      <p>개당 가격 </p>

      {/* 05-12  */}
      <p>
        {orderTypeWord} 총 가격: {orderDatas.totals[orderType]}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" && "column",
        }}
      >
        {showItemArr}
      </div>
    </div>
  );
};

export default Type;
```

## Option.js

```js
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
```
