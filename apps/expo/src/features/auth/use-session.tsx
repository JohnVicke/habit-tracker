import React from "react";

import { secureStore } from "~/utils/secure-store";

interface AuthContextType {
  session: string | null;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be used within an AuthProvider");
  }

  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const value = useSessionStorage();
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

function useSessionStorage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [session, setSession] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      const session = await secureStore.getItem("session_token");
      setIsLoading(false);
      setSession(session);
    };
    void getSession();
  }, []);

  return { session, isLoading };
}
