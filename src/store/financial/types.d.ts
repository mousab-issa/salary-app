interface FinancialState {
  userProfile: UserProfileResponse | null;
  userTransactions: UserTransactionsResponse | null;
  userBalance: number | null;
  maxWithdraw: number | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

interface UserProfileResponse {
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface Transaction {
  uid: number;
  amount: number;
  date: string;
}

interface UserTransactionsResponse {
  available: number;
  transactions: Transaction[];
}

type UserWithdrawResponse = string;

type GetUserProfileApiResponse = ApiResponse<UserProfileResponse>;
type GetUserTransactionsApiResponse = ApiResponse<UserTransactionsResponse>;
type UserWithdrawApiResponse = ApiResponse<UserWithdrawResponse>;
