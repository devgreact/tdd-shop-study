test("이미지 서버 로딩 통신 에러", async () => {
  server.resetHandlers(
    rest.get("http://localhost:5000/products", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Type orderType="products" />);
  const errbanner = await screen.findByTestId("error-banner");
  expect(errbanner).toHaveTextContent("에러가 발생했습니다.");
});
