// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// API Mocking 설정
import { server } from "./mocks/server";

// 모든 테스트 전에 서버를 listen 으로 시작
beforeAll(() => server.listen());

// 하나 하나 서버의 호출 테스트 진행
afterEach(() => server.resetHandlers());

// 테스트 완료 후에 서버가 종료할 때 테스트
afterAll(() => server.close());
