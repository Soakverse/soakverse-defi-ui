export interface AuthType {
  deviceId: string;
  tokenExpiresAt: number;
  isloggedIn: boolean;
  isRememberMe: boolean;
  maxAge: number;
}
