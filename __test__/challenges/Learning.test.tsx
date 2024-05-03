import "@testing-library/jest-dom";
import Learning from "@/components/sections/challenges/Learning";
import { render, screen } from "@testing-library/react";
import { community } from "../../__mocks__/community";
import { course, learningModule } from "../../__mocks__/course";

import ReduxProvider from "../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

const learningProps = {
  courses: course,
  learningModules: learningModule,
  community: community
}

const RenderLearning = (props = learningProps) => {
  render(
    <ReduxProvider>
      <Learning courses={props.courses} learningModules={props.learningModules} community={props.community}/>
    </ReduxProvider>
  );
  return screen.getByTestId("");
}

describe('Learning', () => {
  it("should render the Learning", () => {
    const learning  = RenderLearning();
    expect(learning).toBeInTheDocument();
  });

      it("should show learning module", () => {
        RenderLearning({ ...learningProps });
        const learningAccordeon = screen.getByTestId("learning accordeon");
        expect(learningAccordeon).toBeInTheDocument();
      });
  })

