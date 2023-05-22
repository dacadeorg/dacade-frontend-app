export interface Wallet {
  main: boolean;
  id: string;
  ref: string;
  created_at: string;
  updated_at: string;
  symbol: string;
  title: string;
  timestamp: number;
  balance: number;
  user_id: string;
  token: string;
  address: string;
  payouts: {
    amount: number;
    token: string;
  }[];
  description: string;
  payouts: any[];
  require_wallet_connection?: boolean;
}
