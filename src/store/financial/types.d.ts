// types
interface AuthState {
  isSignedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  token: string | null;
  user: User | null;
  errorMessage: string;
}

type User = {
  uid?: string;
  phone: string;
};

type SignInApiResponse = ApiResponse<{
  phone: string;
  token: string;
}>;
