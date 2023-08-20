import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

export const useOrderApi = () => {

    const {token} = useContext(AuthContext);

    const orderApi = axios.create({
        baseURL: "http://localhost:3000/checkout",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return {};
}