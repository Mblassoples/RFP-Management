import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const mockUser = {
  uid: 'mock-uid-123',
  email: 'test@example.com',
  displayName: 'Test User',
} as User;

const AuthContext = createContext<AuthContextType>({ user: mockUser, loading: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ user: mockUser, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);