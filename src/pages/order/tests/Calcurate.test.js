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
