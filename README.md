# 상품 판매 관련 설정 05 Context 를 사용하기 02 계산하기

- context 를 사용할 준비를 완료했다.
- context 를 이용해서 제품, 옵션을 추가 함에 따라 상품의 총 가격과 옵션의 총 가격 그리고 제품과 옵션의 총가격을 더한 총 가격을 나타내 보자.

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

  return (
    <div>
      <h2>제품 종류</h2>
      <p>개당 가격: </p>
      <p>총 가격:</p>
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

Product.sj

```js
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
```

## Option.js

```js
import React from "react";

//05-9
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
      /> {/* 05-11 Type.js 로 이동 */}
      <label htmlFor={name}>{name}</label>
    </form>
  );
};

export default Option;
```

## Type.js

```js
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
      /> {/* 05-11 Type.js 로 이동 */}
      <label htmlFor={name}>{name}</label>
    </form>
  );
};

export default Option;
```
