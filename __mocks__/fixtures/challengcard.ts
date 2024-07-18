import { ChallengeCardProps } from "@/components/cards/challenge/Challenge";
import { challenge } from "./challenge";
import { mockCommunity } from "./community";

export const mockChallengeCardProps: ChallengeCardProps = {
  data: challenge,
  community: mockCommunity,
  isCourseEnd: true,
};
