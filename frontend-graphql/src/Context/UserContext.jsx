import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";


export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
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
    const login = (loginInfos) => {
        setUser(loginInfos);
        localStorage.setItem('user', JSON.stringify(loginInfos));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    const register = (registerInfos) => {
        console.log("Nouvel utilisateur enregistré : ", registerInfos);
    };

    const getUserInfos = () => {
        if (user) {
            return user;
        } else {
            const storeUser = localStorage.getItem("user");
            if (storeUser && storeUser !== "undefined") {
                // setUser(JSON.parse(storeUser));
                return storeUser;
            }
        }
    };

    return <UserContext.Provider value={{ login, getUserInfos, logout, register }}>{children}</UserContext.Provider>;

};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { UserProvider };