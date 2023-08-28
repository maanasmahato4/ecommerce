import { createContext, useState } from "react";
import { ICartProduct } from "../types/product.types";

interface ICheckOut {
    checkOutList: Array<ICartProduct>
    setCheckOutList: (checkOutList: any) => void
}

export const CheckOutContext = createContext<ICheckOut>({
    checkOutList: [],
    setCheckOutList: () => { }
})


export const CheckOutProvider = ({ children }: any) => {
    const [checkOutList, setCheckOutList] = useState<Array<ICartProduct>>([]);
    return <CheckOutContext.Provider value={{ checkOutList, setCheckOutList }}>
        {children}
    </CheckOutContext.Provider>
}