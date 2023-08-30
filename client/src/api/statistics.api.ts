import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export const useStatsApi = () => {
    const { token } = useContext(AuthContext);
    const statsApi = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
        headers: {
            Authorization: `bearer ${token}`
        }
    });

    const getProductCount = async (): Promise<any> => {
        try {
            const { data } = await statsApi.get(`/product/count`);
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    };

    const getOrderCount = async (status: string): Promise<any> => {
        try {
            const { data } = await statsApi.get(`/checkout/count?status=${status}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const getTotalRevenue = async (): Promise<any> => {
        try {
            const { data }: any = await statsApi.get(`/checkout`);
            let totalRevenue = 0;
            data.forEach((item: any) => {
                const totalPerOrder = item.cartItems.reduce((total: number, cartItem: any) => {
                    const price = cartItem.product.price;
                    const quantity = cartItem.quantity;
                    return total + (price * quantity);
                }, 0)
                totalRevenue += totalPerOrder;
            })
            return totalRevenue;
        } catch (error) {
            console.log(error);
        }
    }
    return { getProductCount, getOrderCount, getTotalRevenue };
}