import { IGetProduct } from "./product.types";

export interface ICartItem {
    product: IGetProduct,
    quantity: number
}

export interface IOrder {
    userId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    cartItems: ICartItem[];
    createdAt: string;
    updatedAt: string;
}

export interface IGetOrder extends IOrder {
    _id: string;
    __v: number;
}