# 상품 판매 관련 설정 05 Context 를 사용하기 01

## OrderContext.js

```js
// 05-1 내보내기 실제 사용하는 부분에 대한 처리
// useContext 를 활용하려고 한다.
export const OrderContext = createContext();
}
```

## Type.js

```js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Option from "./Option";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../context/OrderContext";

// orderType="products"  orderType="options"
const Type = ({ orderType }) => {
  // 서버에서 들어온 데이터 저장
  const [items, setItems] = useState([]);
  // 서버 에러 표시
  const [error, setError] = useState(false);

  // 05-2 contxt 사용
  const [orderDatas, updateItemCount] = useContext(OrderContext)


```
