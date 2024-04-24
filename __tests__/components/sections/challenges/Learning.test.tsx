import Learning from "@/components/sections/challenges/Learning";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { community } from "../../../../__mocks__/community";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

jest.mock("next/router", () => ({
    useRouter: () => ({
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }),
  }));

describe("Learning", () => {
    it("should render what is being learned", () => {
        renderWithRedux(
        <Learning courses={[]} learningModules={[]} community={community}/>
        )
        const learning = screen.getByTestId("learningId")
        expect(learning).toBeInTheDocument()
    })
})