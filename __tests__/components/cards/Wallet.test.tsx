import CardsWallet from "@/components/cards/Wallet";
import { renderWithRedux } from "../../../__mocks__/renderWithRedux";
import { mockWallet } from "../../../__mocks__/fixtures/wallet";
import { mockUser } from "../../../__mocks__/fixtures/user";
import { mockReferral } from "../../../__mocks__/fixtures/referrals";
// jest.mock("@/store/feature/kyc.slice", () => ({
//   openVerificationModal: jest.fn(),
// }));


describe("Wallet card compoent", () => {
  it("renders the wallet component", () => {
    renderWithRedux(<CardsWallet wallet={mockWallet} disabled={false} />, {
      data: mockUser,
      userBalance: null,
      balance: null,
      walletAddresses: null,
      token: null,
      referrals: [mockReferral],
      fetchingUserLoading: false,
      filteredUsers: [mockUser],
    } as any);
  });

});
