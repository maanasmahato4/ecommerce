import { createContext, useState } from "react";
import { IGetProduct, IProductContext } from "../types/product.types";

export const ProductContext = createContext<IProductContext>({
    cartItems: [],
    setCartItem: () => { },
    searchData: '',
    setSearchData: () => { },
    product: null,
    setProduct: () => { }
})

export const ProductProvider = ({ children }: any) => {
    const [searchData, setSearchData] = useState<string>("");
    const [product, setProduct] = useState<IGetProduct | null>(null);
    const [cartItems, setCartItem] = useState<Array<IGetProduct | any>>([]);
    return <ProductContext.Provider value={{ searchData, setSearchData, product, setProduct, cartItems, setCartItem }}>
        {children}
    </ProductContext.Provider>
}