jest.mock("@/hooks/useTypedSelector", () => ({
    useSelector: jest.fn(),
  }));
  