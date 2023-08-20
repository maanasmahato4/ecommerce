import { createContext, useState, useEffect } from "react";
import { IAuth } from "../types/auth.types";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext<IAuth>({
    token: '',
    setToken: () => { },
    decodedToken: [],
    setDecodedToken: () => { }

})

export function AuthProvider({ children }: any) {
    const [token, setToken] = useState('');
    const [decodedToken, setDecodedToken] = useState([]);

    useEffect(() => {
        const CookieToken = Cookie.get("token");
        if (CookieToken) {
            setToken(CookieToken);
            setDecodedToken(jwtDecode(CookieToken));
        } else {
            Cookie.set("token", token);
        }

    }, [token]);
    return (
        <AuthContext.Provider value={{ token, setToken, decodedToken, setDecodedToken }}>
            {children}
        </AuthContext.Provider>
    )
}