import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Storage } from "../firebase/firebase.config";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { IGetProduct } from "../types/product.types";

export const useProductApi = () => {

    const { token } = useContext(AuthContext);

    const productApi = axios.create({
        baseURL: "http://localhost:3000/product",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const getProduct = async (id: string): Promise<IGetProduct> => {
        try {
            const res = await productApi.get(`/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    const getProducts = async (category: (string | undefined)): Promise<AxiosResponse<any, any>> => {
        try {
            const url = category != undefined ? `?category=${category}` : '/'
            const { data } = await productApi.get(url);
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    const addProduct = async (product: any): Promise<AxiosResponse<any, any>> => {
        const { productName, productDescription, inStock, category, brandName, price, discount, imageUrls, images } = product;
        try {
            const imageUploadPromises = images.map((image: any) => {
                const imageRef = ref(Storage, `product/${image.name + "-" + Date.now()}`);
                return uploadBytes(imageRef, image).then(() => getDownloadURL(imageRef));
            });

            const imageUrls = await Promise.all(imageUploadPromises);

            const finalProductData = {
                productName,
                productDescription,
                inStock,
                category,
                brandName,
                price,
                discount,
                imageUrls
            }

            const res = await productApi.post("/", finalProductData);
            return res;

        } catch (error: any) {
            throw new Error(error);
        }
    }

    const updateProduct = async (id: string, uproduct: any): Promise<AxiosResponse<any, any>> => {
        const { productName, productDescription, inStock, category, brandName, price, discount, images, imageUrls } = uproduct;
        try {
            // delete old images from the firebase storage
            if (imageUrls && imageUrls >= 1) {
                const imageDeletePromises = imageUrls.map((image: string) => {
                    const imageRef = ref(Storage, image);
                    return deleteObject(imageRef);
                })

                await Promise.all(imageDeletePromises);
            }

            if (images && images.length >= 1) {
                const imageUploadPromises = images.map((image: any) => {
                    const imageRef = ref(Storage, `product/${image.name + "-" + Date.now()}`);
                    return uploadBytes(imageRef, image).then(() => getDownloadURL(imageRef));
                });

                const imageUrls = await Promise.all(imageUploadPromises);

                const finalProductData = {
                    productName,
                    productDescription,
                    inStock,
                    category,
                    brandName,
                    price,
                    discount,
                    imageUrls
                }
                const res = await productApi.put(`/${id}`, finalProductData);
                return res;
            } else {
                const finalProductData = {
                    productName,
                    productDescription,
                    inStock,
                    category,
                    brandName,
                    price,
                    discount,
                    imageUrls
                }
                const res = await productApi.put(`/${id}`, finalProductData);
                return res;
            }

        } catch (error: any) {
            throw new Error(error);
        }
    }

    const deleteProduct = async (id: string) => {
        try {
            const res = await getProduct(id);
            const { imageUrls } = res;
            if (imageUrls && imageUrls.length >= 1) {
                const deleteImagePromises = imageUrls.map((image) => {
                    const imageRef = ref(Storage, image);
                    return deleteObject(imageRef);
                });
                await Promise.all(deleteImagePromises);
            }
            const { data } = await productApi.delete(id);
            return data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return { getProduct, getProducts, addProduct, updateProduct, deleteProduct };
}