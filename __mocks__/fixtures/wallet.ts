import { Payout, Wallet } from "@/types/wallet";
import { mockUser } from "./user";

export const mockPayout: Payout = {
    amount: 1,
    token: "ICP"
}

export const mockWallet: Wallet = {
    main: false,
    id: "",
    ref: "",
    created_at: "2024-01-29T08:00:00Z",
    updated_at: "2024-01-29T08:00:00Z",
    symbol: "ICP",
    title: "User wallet",
    timestamp: 0,
    balance: 0,
    user_id: mockUser.id,
    token: "ICP",
    address: "0xd05AfA87A599b8AD8Cff71b1eC7129e3Edfe08b9",
    payouts: [mockPayout],
    description: ""
}