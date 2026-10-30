import { createContext, useState } from "react";
import {
    getSessionUser,
    login as loginUser,
    logout as logoutUser,
    signup as signupUser,
    updateDisplayName as updateUserDisplayName,
} from "../services/authService";

const AuthContext = createContext();

function AuthProvider(props) {
    const [user, setUser] = useState(getSessionUser);
    const isLoggedIn = user !== null;

    async function login(credentials) {
        await loginUser(credentials);
        setUser(getSessionUser());
    }

    async function signup(details) {
        return signupUser(details);
    }

    async function logout() {
        logoutUser();
        setUser(null);
    }

    function updateDisplayName(name) {
        const updatedUser = updateUserDisplayName(name);
        if (!updatedUser) return false;
        setUser(updatedUser);
        return true;
    }

    return(
        <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, updateDisplayName }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProvider};
export default AuthContext;