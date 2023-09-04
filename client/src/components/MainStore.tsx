import { Select, Button, Flex, Card, Image, Group, Text, Badge } from "@mantine/core";
import { useProductApi } from "../api/products.api";
import { useQuery } from "@tanstack/react-query";
import { useState, useContext, useEffect } from "react";
import { IGetProduct } from "../types/product.types";
import { useCategoryApi } from "../api/category.api";
import { CategoryContext } from "../context/category.context";
import SearchProduct from "../components/SearchProduct";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/product.context";
import { SuccessNotification } from "./Notification";
import PaginationComponent from "./Pagination";

function MainStore() {
  const { setCategories } = useContext(CategoryContext);
  const { setProduct, setCartItem, cartItems } = useContext(ProductContext);

  const navigate = useNavigate();

  const { getProducts } = useProductApi();
  const { getCategories } = useCategoryApi();
  const [category, setCategory] = useState<string | undefined>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);


  const productQuery = useQuery({
    queryKey: ["products", category, search, page],
    queryFn: async () => await getProducts(category, search, page)
  });

  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: async () => await getCategories()
  });

  useEffect(() => {
    if (categoryQuery.data) {
      setCategories(categoryQuery.data);
    }
  }, [categoryQuery.data]);



  if (productQuery.isLoading || categoryQuery.isLoading) {
    return <h1>loading...</h1>
  }

  if (productQuery.isError || categoryQuery.isError) {
    return <h1>error..</h1>
  }

  const CategorySelect = categoryQuery.data.map((item: { _id: string, category: string }, idx: number) => {
    return { value: item.category, label: item.category, key: idx + 1 };
  });



  return (
    <section style={{ position: "relative", minHeight: "100vh" }}>
      <Flex direction="row" justify="space-between" wrap="wrap" mx="auto">
        <div style={{ width: "80%" }}>
          <SearchProduct setSearch={(value: string) => setSearch(value)} />
        </div>
        <Select label="Category" style={{ width: "20%" }} defaultValue={category} data={[
          { value: "all", label: "all", key: 0 },
          ...CategorySelect
        ]} onChange={(value: any) => setCategory(value)} />
      </Flex>

      <Flex direction="row" justify="center" wrap="wrap" mx="auto">
        {productQuery.data.map((product: IGetProduct, idx: number) => {
          const { _id, discount, imageUrls, price, productDescription, productName } = product;
          return (
            <Card key={idx} shadow="sm" radius="md" withBorder style={{ margin: "0.5rem", marginBlock: "1rem", padding: "2rem", width: "300px" }}>
              <Card.Section>
                <Carousel mx="auto" maw={350} height="auto">
                  {imageUrls.map((image: string, idx: number) => {
                    return <Carousel.Slide key={idx}>
                      <Image src={image} alt={productName} style={{ maxHeight: '200px', width: 'auto' }} />
                    </Carousel.Slide>
                  })}
                </Carousel>
              </Card.Section>
              <Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <div>
                    <Text weight={500}>{productName}</Text>
                  </div>
                  <div>
                    <Badge color="pink" variant="light">
                      {discount}% off
                    </Badge>
                    <Text>${price}</Text>
                  </div>
                </Group>
                <Text style={{ marginBlock: "10px" }}>{productDescription.slice(0, 100)}...<span style={{ color: "purple", cursor: "pointer", textDecoration: "underline" }} onClick={() => { setProduct({ ...product }); navigate(`/about/${_id}`) }}>see more</span></Text>
                <Button onClick={() => {setCartItem([...cartItems, { ...product }]); SuccessNotification("Item added to cart!", "")}}>Add to cart</Button>
              </Card.Section>
            </Card>
          )
        })}
      </Flex>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PaginationComponent page={(value: number) => setPage(value)}/>
      </div>
    </section>
  )
}

export default MainStore;