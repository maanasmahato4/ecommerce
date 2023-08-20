import { createContext, useState } from "react";
import { IGetProduct, IProductContext } from "../types/product.types";

export const ProductContext = createContext<IProductContext>({
    product: null,
    setProduct: () => { }
})

export const ProductProvider = ({ children }: any) => {
    const [product, setProduct] = useState<IGetProduct | null>(null);
    return <ProductContext.Provider value={{ product, setProduct }}>
        {children}
    </ProductContext.Provider>
}