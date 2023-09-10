import { Group, NumberInput, Select } from "@mantine/core";
import SearchProduct from "./SearchProduct";
import { useContext, useEffect } from 'react';
import { FilterContext } from "../context/filter.context";
import { useQuery } from "@tanstack/react-query";
import { useCategoryApi } from "../api/category.api";
import { CategoryContext } from "../context/category.context";
import { LoadingScreen } from "./LoadingScreen";

function Filter() {
  const { priceRange, setPriceRange, setCategory, category } = useContext(FilterContext);


  const { setCategories } = useContext(CategoryContext);
  const { getCategories } = useCategoryApi();

  const handleChange = (name: string) => (value: number) => {
    setPriceRange({ ...priceRange, [name]: value })
  }

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: async () => await getCategories()
  });

  useEffect(() => {
    if (categoryQuery.data) {
      setCategories(categoryQuery.data);
    }
  }, [categoryQuery.data]);

  if (categoryQuery.isLoading) {
    return <LoadingScreen />
  }

  if (categoryQuery.isError) {
    return <h1>error..</h1>
  }



  const CategorySelect = categoryQuery.data.map((item: { _id: string, category: string }, idx: number) => {
    return { value: item.category, label: item.category, key: idx + 1 };
  });





  return (
    <div>
      <p>Filter</p>
      <Select style={{ marginBlock: "0.5rem" }} label="Category" defaultValue={category} data={[
        { value: "all", label: "all", key: 0 },
        ...CategorySelect
      ]} onChange={(value: any) => setCategory(value)} />
      <SearchProduct />
      <p>Price Range: </p>
      <Group display="flex">
        <NumberInput type="number" name='low' value={priceRange.low || 0} placeholder="$" style={{ width: "100px" }} onChange={handleChange('low')} />-
        <NumberInput type="number" name='high' value={priceRange.high || 1000000} placeholder="$" style={{ width: "100px" }} onChange={handleChange('high')} />
      </Group>

    </div>
  )
}

export default Filter;
