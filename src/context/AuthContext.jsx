import {createContext, useState} from "react";

const AuthContext = createContext();

function AuthProvider(props) { 
    const [user, setUser] = useState(null);
    const isLoggedIn = user !== null;
    return(
        <AuthContext.Provider value={{user, setUser,isLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProvider};
export default AuthContext;