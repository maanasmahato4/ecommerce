import { createContext, useState } from "react";

export const CategoryContext = createContext<any>({
    categories: {},
    setCategories: () => { }
});

export const CategoryProvider = ({ children }: any) => {
    const [categories, setCategories] = useState<any>();
    return <CategoryContext.Provider value={{ categories, setCategories }}>
        {children}
    </CategoryContext.Provider>
}

