import { TextInput, Button, Flex } from "@mantine/core";
import { ChangeEvent, useContext } from "react";
import { ProductContext } from "../context/product.context";

interface SearchProductProps {
    setSearch: (value: string) => void;
}

function SearchProduct({ setSearch }: SearchProductProps) {
    const { searchData, setSearchData } = useContext(ProductContext);
    return (
        <Flex direction="row">
            <TextInput placeholder="example: Bag" label="Search product" value={searchData || ''}
                rightSection={
                    <Button.Group>
                        <Button onClick={() => setSearch(searchData)}>Search</Button>
                        <Button color="red" onClick={() => {setSearchData(''); setSearch('');}}>Clear</Button>
                    </Button.Group>
                } style={{ width: "80%" }} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchData(e.target.value)} />
        </Flex>
    )
}

export default SearchProduct;