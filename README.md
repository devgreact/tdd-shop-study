# 상품 판매 관련 설정 03 Context 를 사용해서 컴포넌트에 데이터 제공하기 01

- 애플리케이션에서 데이터를 처리하는 방법은 여러가지 방법이 있다.
- 이 앱에서 보면 상품을 계산하는 데이터를 처리해줘야 한다.
- 상품을 추가 할 수록 그에 맞게 가격을 올려줘야 하고 옵션을 추가해도 올려줘야 한다.
- 그리고 총 가격을 상품 주문 페이지에서도 보고 주문 확인 페이지에서 봐야하기 때문에 데이터를 여러 곳에 이동해 주어야 한다.

## Context

- https://ko.reactjs.org/docs/context.html

## Context 를 사용해서 할 일

- 어떠한 컴포넌트에서 총 가격을 Update 해주는 것
- 어떠한 컴포넌트에서 총 가격을 보여주는 것

## Context 를 사용하는 법

### 1. Context 를 생성

- react 에서 createContext 함수 사용
- context 는 여러개를 만들 수 있다.
- const OrderContext = createContext();

### 2. Context 를 생성 후 Provider 안에서 사용가능하기 때문에 Provider 생성

- value 에 들어갈 값은
- App 컴포넌트에서 사용할 데이터
- App 컴포넌트에서 데이터를 업데이트 하는 함수

```js
<OrderContext.Provider value={???}>
 <App/>
</OrderContext.Provider>
```

#### 2.1. src/context 폴더 생성 / OrderContext.js 생성

```js
import { createContext } from "react";
const OrderContext = createContext();
```

#### 2.2. App.js 에서 OrederContex 활용을 위한 Provider 적용

```js
import Order from "./pages/order/Order";
import { OrderContext } from "./context/OrderContext";
function App() {
  return (
    <div>
      <OrderContext.Provider>
        <Order />
      </OrderContext.Provider>
    </div>
  );
}

export default App;
```

### 3. 더 복잡한 로직을 구성하기 위해서 Provider를 위한 함수 작성

#### 3.1 기본 적용법

- OrderContext 에서 사용할 값이 만약
- App.js 에서 value 를 전달하면 된다.

```js
import Order from "./pages/order/Order";
import { OrderContext } from "./context/OrderContext";
function App() {
  let value = {
    a: "a",
    b: "b",
  };
  return (
    <div>
      <OrderContext.Provider value={value}>
        <Order />
      </OrderContext.Provider>
    </div>
  );
}

export default App;
```

- 복잡한 데이터를 처리해야 하므로 OrderContext.js 에서 작성하는 것이 효율적이고 확장성도 좋다.

- App.js 에서 원래대로 돌리고 나중에 함수 만들어 준것으로 감싸주면 된다.

```js
import Order from "./pages/order/Order";
import { OrderContext } from "./context/OrderContext";
function App() {
  return (
    <div>
      <Order />
    </div>
  );
}

export default App;
```

#### 3.2 기본 적용법

- OrderContext.js

```js
import { createContext } from "react";
const OrderContext = createContext();

export function OrderContextProvider(props) {
  return <OrderContext.Provider value {...props} />;
}
```

- App.js

```js
import Order from "./pages/order/Order";
import { OrderContextProvider } from "./context/OrderContext";
function App() {
  return (
    <div>
      <OrderContextProvider>
        <Order />
      </OrderContextProvider>
    </div>
  );
}

export default App;
```

#### 3.3 value 로 넣을 데이터를 만들어주기

- 필요한 데이터와 데이터를 업데이트 해줄 함수
- 필요한 데이터 형식은 Map 으로 만들어줄 예정
  Map 은 간단한 키와 값을 서로 연결(매핑)시켜 저장하며 저장된 순서대로 각 요소들을 반복적으로 접근할 수 있도록 한다.
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- 키와 값으로 Map 데이터를 만든다.
- 리액트는 state 를 이용해서 업데이트를 한다.
- value 는 리턴 값으로 넣어줄 것이다.
- useMemo 를 활용하는 이유는 Provider 안에 OrderPage컴포넌트를 감쌌다.
- Provider 안에 있는 OrderPage 컴포넌트에 넣어준 value 가 바뀌면 모든 컴포넌트는 랜더링을 모두 하게 된다.
- 모든 컴포넌트가 리랜더링 되면 성능상 문제가 있다. 이를 해결하기 위한 방안이다.
- 필요할 때만 리랜더링 하기 위한 용도이다.

- OrderContext.js 에서 사용할 값과 업데이트 할 값을 모두 작성해 주면됨

```js
import { createContext, useMemo, useState } from "react";
const OrderContext = createContext();

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const value = useMemo(() => {
    // 업데이트를 해줄 함수 정의
    // itemName : 제품명
    // newItemCount : 몇개인지
    // orderType : 옵션 구분
    function updateItemCount(itemName, newItemCount, orderType) {
      // orderCounts 업데이트
      // state 를 바로 업데이트 하면 안된다.
      const newOrderCounts = { ...orderCounts };
      console.log("newOrderCounts 원본 : ", newOrderCounts);

      // Map 을 업데이트 해줘야 한다.
      // product 인지 options 인지 구분한다.
      const orderCountsMap = orderCounts[orderType];
      // Map 을 업데이트 하는 것은 set 으로 업데이트 한다.
      // 아이템 이름, 갯수
      orderCountsMap.set(itemName, parseInt(newItemCount));

      console.log("newOrderCount 이후 : ", newOrderCounts);

      // 값을 넣어준다.
      setOrderCounts(newOrderCounts);
    }
    // 추후 추가적인 내용이 들어갈 것이므로
    // 함수도 같이 리턴한다.
    return [{ ...orderCounts }, updateItemCount];
  }, [orderCounts]);

  return <OrderContext.Provider value={value} {...props} />;
}
```
