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
