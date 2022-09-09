import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextValues {
  login(data: User): Promise<unknown>;

  user: User;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

interface Props {
  children: React.ReactNode;
}

type User = {
  name: string;
};

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    getSession();
  }, []);

  function setSession(data: User) {
    setUser(data);

    localStorage.setItem("@EM1A:user", JSON.stringify(data));
  }

  function getSession() {
    const storedUser = localStorage.getItem("@EM1A:user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }

  async function login(data: User) {
    return new Promise((resolve, reject) => {
      setSession(data);

      resolve(200);
    });
  }

  const values: AuthContextValues = {
    login,
    user,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
