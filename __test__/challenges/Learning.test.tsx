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

      //   example from another test
    //   it("should show rewards when we have rewards and show rewards when enabled", () => {
    //     RenderCommunityCard({ ...communityCardProps, showRewards: true });
    //     const communityCardButtonrewards = screen.getByTestId("community-rewards");
    //     expect(communityCardButtonrewards).toBeInTheDocument();
    //   });
  })

