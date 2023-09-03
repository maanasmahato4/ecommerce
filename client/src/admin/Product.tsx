import { ActionIcon, Modal, TextInput, NumberInput, FileInput, Select, Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useProductApi } from "../api/products.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { IGetProduct } from "../types/product.types";
import { useCategoryApi } from "../api/category.api";
import { CategoryContext } from "../context/category.context";
import SearchProduct from "../components/SearchProduct";
import { LoadingScreen } from "../components/LoadingScreen";
import { SuccessNotification } from "../components/Notification";

function Product() {
  const { setCategories } = useContext(CategoryContext);

  const [opened, { open, close }] = useDisclosure(false);
  const { addProduct, getProducts } = useProductApi();
  const { getCategories } = useCategoryApi();
  const [category, setCategory] = useState<string | undefined>("all");
  const [search, setSearch] = useState<string>("");

  const queryClient = useQueryClient();

  /* const { data, isLoading, isError } = useQuery({
    queryKey: ["products&categories"],
    queryFn: async () => {
      const [products, categories] = await Promise.all([getProducts(category), getCategories()]);
      return { products, categories };
    }
  }) */

  const productQuery = useQuery({
    queryKey: ["products", category, search],
    queryFn: async () => await getProducts(category, search)
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


  const form = useForm({
    initialValues: {
      productName: "",
      productDescription: "",
      inStock: 0,
      category: "",
      brandName: "",
      price: 0,
      discount: 0,
      images: []
    }
  })

  const handleSubmitMutation = useMutation(
    async (product: any): Promise<void> => {
      await addProduct(product);
      form.reset();
      SuccessNotification(`New product added!`, "");
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products&categories"]);
      }
    }
  );

  if (productQuery.isLoading || categoryQuery.isLoading) {
    return <LoadingScreen />
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
          return <ProductCard key={idx} {...product} />
        })}
      </Flex>
      <div style={{ position: "fixed", bottom: "5rem", right: "10px" }}>
        <ActionIcon variant="filled" color="blue" size="2rem" onClick={open}>
          <IconPlus size="1rem" />
        </ActionIcon>
      </div>
      <Modal opened={opened} onClose={close} title="New Product">
        <form onSubmit={form.onSubmit(values => { handleSubmitMutation.mutate(values); })}>
          <TextInput label="Product Name" required withAsterisk {...form.getInputProps("productName", { type: "input" })} />
          <TextInput label="Product Description" required withAsterisk {...form.getInputProps("productDescription", { type: "input" })} />
          <NumberInput label="InStock" required withAsterisk {...form.getInputProps("inStock", { type: "input" })} />
          <Select label="Category" data={CategorySelect} required withAsterisk {...form.getInputProps("category", { type: "input" })} />
          <TextInput label="Brand Name" required withAsterisk {...form.getInputProps("brandName", { type: "input" })} />
          <NumberInput label="Price" placeholder="in $USD" required withAsterisk {...form.getInputProps("price", { type: "input" })} />
          <NumberInput label="Discount" placeholder="in %" required withAsterisk {...form.getInputProps("discount", { type: "input" })} />
          <FileInput label="Images" placeholder="pictures of the product" multiple {...form.getInputProps("images", { type: "input" })} />
          <Button.Group style={{ marginBlock: "0.7rem" }}>
            <Button type="submit">Submit</Button>
            <Button color="red" type="reset">Clear</Button>
          </Button.Group>
        </form>
      </Modal>
    </section>
  )
}

export default Product;