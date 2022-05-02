import { createContext, ReactNode, useContext, useState } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<
  [string | null, (token: string | null) => void]
>([null, () => {}]);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={[token, setToken]}>{children}</AuthContext.Provider>
  );
};

// hooks
export const useAuth = () => useContext(AuthContext);
