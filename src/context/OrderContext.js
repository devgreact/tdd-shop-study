import { createContext, useEffect, useMemo, useState } from "react";
const OrderContext = createContext();

// 04-4
const pricePerItem = {
  products: 1000,
  options: 500,
};
function calculateSubtotal(orderType, orderCounts) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[orderType];
}
///////////////////////////////////
export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  // 04-1   상품 가격 계산을 위한 코드
  // 상품을 추가할때마다 업데이트
  const [totals, setTotals] = useState({
    // 가격 0
    products: 0,
    // 가격 0
    options: 0,
    // 총 가격 0
    total: 0,
  });

  // 04-2   상품 가격 계산을 위한 코드
  // orderCounts 변할때 마다.
  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total: total,
    });
  }, [orderCounts]);

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

    // 04-3   상품 가격 계산을 위한 코드
    return [{ ...orderCounts, totals }, updateItemCount];
    // 04-5
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
