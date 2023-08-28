import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { IGetUsers } from "../types/auth.types";

export const useUsersApi = () => {
    const { token } = useContext(AuthContext);

    const userApi = axios.create({
        baseURL: "http://localhost:3000/user",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    async function getUsers(role: string | undefined): Promise<Array<IGetUsers>> {
        const url = `?role=${role}`;
        const { data } = await userApi.get(url);
        return data;
    }

    async function updateUser(id: string, user: any): Promise<any> {
        const { data } = await userApi.put(`/${id}`, user);
        return data;
    }

    async function deleteUser(id: string): Promise<any> {
        const { data } = await userApi.delete(id);
        return data;
    }

    return { getUsers, updateUser, deleteUser };
}