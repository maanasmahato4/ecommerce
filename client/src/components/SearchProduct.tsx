import { TextInput, Flex, ActionIcon } from "@mantine/core";
import { ChangeEvent, useContext } from "react";
import { FilterContext } from "../context/filter.context";
import { IconClearAll } from "@tabler/icons-react";


function SearchProduct() {
    const { searchParam, setSearchParam } = useContext(FilterContext);
    return (
        <Flex direction="row">
            <TextInput placeholder="Search" value={searchParam || ''}
                rightSection={
                    <ActionIcon color="red" onClick={() => { setSearchParam(''); }}><IconClearAll /></ActionIcon>
                } style={{ width: "80%" }} onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearchParam(e.target.value); }} />
        </Flex>
    )
}

export default SearchProduct;