export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  company?: string;
  role?: string;
}

export interface AuthError {
  code: string;
  message: string;
}