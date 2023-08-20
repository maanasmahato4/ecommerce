import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ISignUp, IsignIn } from "../types/auth.types";


export const useAuthApi = () => {
    const { setToken, setDecodedToken } = useContext(AuthContext);

    const authApi = axios.create({
        baseURL: "http://localhost:3000/auth",
        withCredentials: true
    });

    async function SignUp(signUpData: ISignUp): Promise<AxiosResponse<any, any>> {
        try {
            const res = await authApi.post("/signup", signUpData);
            return res;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function SignIn(signInData: IsignIn): Promise<AxiosResponse<any, any>> {
        try {
            const res = await authApi.post("/signin", signInData);
            return res;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function SignOut(): Promise<AxiosResponse<any, any>> {
        try {
            const res = await authApi.post("/signout");
            Cookies.remove("token");
            setToken("");
            setDecodedToken("");
            return res.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return { SignUp, SignIn, SignOut };
}