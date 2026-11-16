import { AuthUser } from "aws-amplify/auth";

export interface AppProps {
  user: AuthUser | undefined;
  signOut: (data?: any) => void;
}