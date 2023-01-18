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
