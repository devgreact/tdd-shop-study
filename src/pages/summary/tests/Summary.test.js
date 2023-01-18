const { render, screen } = require("@testing-library/react");
import Summary from "../Summary";

//  Summary 기능 체크
test("Summary Checkbox 테스트", () => {
  // 1. 테스트 대상 컴포넌트를 render()
  //    render : html 태그로 적용
  render(<Summary />);
  // 2. 테스트 하고자 하는 체크박스 element 등록
  let checkbox = screen.getByRole("checkbox", {
    name: "주문 사항을 확인하셨나요?",
  });
  // 3. expect
  expect(checkbox.checked).toEqual(false);

  // 구매확인 버튼 비활성 체크
  let confirmBt = screen.getByRole("button", { name: "주문 확인" });
  expect(confirmBt.disabled).toBeTruthy();
});
