import { createContext, useState, useEffect, ReactNode } from "react";

// Interface utilisateur
interface UserInfo {
  id?: string;
  username?: string;
  email?: string;
  bio?: string | null;
  token?: string;
}

// Interface du contexte
interface UserContextType {
  login: (loginInfos: UserInfo) => void;
  getUserInfos: () => UserInfo | string | null;
  logout: () => void;
  register: (userInfo: UserInfo) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

// Création du contexte avec des valeurs par défaut
export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  getUserInfos: () => null,
  logout: () => {},
  register: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserInfo | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erreur de parsing du localStorage:", error);
        }
      }
    }
  }, [user]);

  const login = (userInfo: UserInfo): void => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    if (userInfo.token) {
      sessionStorage.setItem("token", userInfo.token); // Stocke le token séparément
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("token"); // Supprime aussi le token
    window.location.href = "/"; // Redirige vers l'accueil
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
