import { createContext, useState, ReactNode } from "react";

export interface IFilter {
    priceRange: Record<string, number>,
    setPriceRange: (priceRange: Record<string, number>) => void,
    searchParam: string;
    setSearchParam: (searchParam: string) => void;
    category: string,
    setCategory: (category: string) => void
}

export const FilterContext = createContext<IFilter>({
    priceRange: { low: 0, high: 0 },
    setPriceRange: (): void => { },
    searchParam: "",
    setSearchParam: (): void => { },
    category: "",
    setCategory: (): void => { }
})

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
    const [priceRange, setPriceRange] = useState<Record<string, number>>({ low: 0, high: 1000000 });
    const [searchParam, setSearchParam] = useState<string>("");
    const [category, setCategory] = useState<string>("all");
    return <FilterContext.Provider value={{ priceRange, setPriceRange, searchParam, setSearchParam, category, setCategory }}>
        {children}
    </FilterContext.Provider>
}
