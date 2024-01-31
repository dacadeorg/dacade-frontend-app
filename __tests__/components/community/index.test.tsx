import CommunityCard from "@/components/cards/community";
import { render, fireEvent } from "@testing-library/react";
import { community } from "../../../__mocks__/community";

test("should call closeRightSection callback", () => {
  const closeRightSectionSpy = jest.fn();

  const { getByTestId } = render(<CommunityCard showRewards={true} community={community} />);

  fireEvent.click(getByTestId("id"));

  expect(closeRightSectionSpy).toHaveBeenCalled();
});
