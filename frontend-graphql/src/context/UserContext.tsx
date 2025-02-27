import { createContext, useState, useEffect, ReactNode } from "react";

// Définition d'une interface pour les informations utilisateur
interface UserInfo {
  id?: string ;
  username?: string;
  email?: string;
  bio?: string | null | undefined;
  token?: string;
}

// Interface pour le contexte
interface UserContextType {
  login: (loginInfos: UserInfo) => void;
  getUserInfos: () => UserInfo | string | null;
  logout: () => void;
  register: (registerInfos: UserInfo) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

// Création du contexte avec une valeur par défaut complète
export const UserContext = createContext<UserContextType>({
  login: () => {},
  getUserInfos: () => null,
  logout: () => {},
  register: () => {}
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserInfo | null>(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (loginInfos: UserInfo): void => {
    setUser(loginInfos);
    localStorage.setItem('user', JSON.stringify(loginInfos));
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const register = (registerInfos: UserInfo): void => {
    console.log("Nouvel utilisateur enregistré : ", registerInfos);
  };

  const getUserInfos = (): UserInfo | string | null => {
    if (user) {
      return user;
    } else {
      const storeUser = localStorage.getItem("user");
      if (storeUser && storeUser !== "undefined") {
        // setUser(JSON.parse(storeUser));
        return storeUser;
      }
      return null;
    }
  };

  return <UserContext.Provider value={{ login, getUserInfos, logout, register }}>{children}</UserContext.Provider>;
};

export { UserProvider };