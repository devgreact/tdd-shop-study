import { rest } from "msw";

export const handlers = [
  // req : 매칭정보, res: 모의 응답, ctx : 상태코드
  // rest.get("주소", (req, res, ctx) => {
  //     return res([{}, {}, {} ...])
  // })

  // 상품 정보 API
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Good1",
          imagePath: "/images/good1.png",
        },
        {
          name: "Good2",
          imagePath: "/images/good2.png",
        },
      ])
    );
  }),
  // 옵션 정보 API
  rest.get("http://localhost:5000/options", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "option1",
        },
        {
          name: "option2",
        },
      ])
    );
  }),
];
