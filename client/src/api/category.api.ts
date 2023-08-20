import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export const useCategoryApi = () => {
    const { token } = useContext(AuthContext);

    const categoryApi = axios.create({
        baseURL: "http://localhost:3000/categories",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const getCategories = async (): Promise<any> => {
        const { data } = await categoryApi.get("/");
        return data;
    }

    const addCategories = async (category: string): Promise<any> => {
        const { data } = await categoryApi.post("/", category);
        return { data };
    }

    const deleteCategories = async (id: string): Promise<any> => {
        const { data } = await categoryApi.delete(`/${id}`);
        return { data };
    }

    return { getCategories, addCategories, deleteCategories };
}