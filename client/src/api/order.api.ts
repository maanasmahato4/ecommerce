import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

export const useOrderApi = () => {

    const { token } = useContext(AuthContext);

    const orderApi = axios.create({
        baseURL: "http://localhost:3000/checkout",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const getAllOrders = async () => {
        try {
            const { data } = await orderApi.get("/");
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const getOrders = async (id: string) => {
        try {
            const { data } = await orderApi.get(`/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    const addOrder = async (order: any) => {
        try {
            const { data } = await orderApi.post("/", order);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateOrder = async (id: string, order: any) => {
        try {
            const { data } = await orderApi.put(`/${id}`, order);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteOrder = async (id: string) => {
        try {
            const { data } = await orderApi.delete(`/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    return { getOrders, addOrder, getAllOrders, updateOrder, deleteOrder };
}