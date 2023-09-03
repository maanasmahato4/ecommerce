import { TextInput, NumberInput, FileInput, Select, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useProductApi } from "../api/products.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ProductContext } from "../context/product.context";
import { CategoryContext } from "../context/category.context";
import { SuccessNotification } from "./Notification";

function UpdateProduct() {
  const queryClient = useQueryClient();
  const { updateProduct } = useProductApi();
  const { product } = useContext(ProductContext);
  const {categories} = useContext(CategoryContext);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (product == null) {
      navigate("/admin");
    }
  }, [])

  const handleUpdateMutation = useMutation(
    async (uproduct: any): Promise<void> => {
      if (id == undefined) {
        throw new Error("id is missing")
      }
      await updateProduct(id, {...uproduct, imageUrls: [...product.imageUrls]});
      SuccessNotification("Product updated!", "green")
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        navigate("/admin/")

      }
    }
  );

  const form = useForm({
    initialValues: {
      productName: product?.productName || '',
      productDescription: product?.productDescription || '',
      inStock: product?.inStock || 0,
      category: product?.category || '',
      brandName: product?.brandName || '',
      price: product?.price || 0,
      discount: product?.discount || 0,
      images: [],
    }
  })

  const categorySelect = categories.map((item: {_id: string, category: string}) => {
    return { value: item.category, label: item.category }
  })

  return (
    <div>
      <form onSubmit={form.onSubmit(values => { handleUpdateMutation.mutate(values); navigate("/admin") })}>
        <TextInput label="Product Name" required withAsterisk {...form.getInputProps("productName", { type: "input" })} />
        <TextInput label="Product Description" required withAsterisk  {...form.getInputProps("productDescription", { type: "input" })} />
        <NumberInput label="InStock" required withAsterisk  {...form.getInputProps("inStock", { type: "input" })} />
        <Select label="Category" data={categorySelect} required withAsterisk  {...form.getInputProps("category", { type: "input" })} />
        <TextInput label="Brand Name" required withAsterisk   {...form.getInputProps("brandName", { type: "input" })} />
        <NumberInput label="Price" placeholder="in $USD" required withAsterisk  {...form.getInputProps("price", { type: "input" })} />
        <NumberInput label="Discount" placeholder="in %" required withAsterisk  {...form.getInputProps("discount", { type: "input" })} />
        <FileInput label="Images" placeholder="pictures of the product" required withAsterisk multiple {...form.getInputProps("images", { type: "input" })} />
        <Button.Group style={{ marginBlock: "0.7rem" }}>
          <Button type="submit">Submit</Button>
          <Button color="red" type="reset">Clear</Button>
        </Button.Group>
      </form>
    </div>
  )
}

export default UpdateProduct;