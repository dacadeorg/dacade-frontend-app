import Learning from "@/components/sections/challenges/Learning";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { community } from "../../../../__mocks__/community";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";

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
        render(
            <ReduxProvider>
        <Learning courses={[]} learningModules={[]} community={community}/>
        </ReduxProvider>
        )
        const learning = screen.getByTestId("learningId")
        expect(learning).toBeInTheDocument()
    })
})