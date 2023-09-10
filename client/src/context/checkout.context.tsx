import { createContext, useState } from "react";
import { IProduct } from "../types/product.types";

interface ICheckOut {
    checkOutList: IProduct[];
    setCheckOutList: (checkOutList: any) => void;
}

export const CheckOutContext = createContext<ICheckOut>({
    checkOutList: [],
    setCheckOutList: () => { }
})


export const CheckOutProvider = ({ children }: any) => {
    const [checkOutList, setCheckOutList] = useState<IProduct[]>([]);
    return <CheckOutContext.Provider value={{ checkOutList, setCheckOutList }}>
        {children}
    </CheckOutContext.Provider>
}