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
      
      {/* 05-12  */}
      <p>총 가격: {orderDatas.totals[orderType]}</p>
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
