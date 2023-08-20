import { IGetProduct, IProduct } from "../types/product.types"
import { Card, Image, Text, Badge, Group, Button, ActionIcon } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Fragment, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductApi } from "../api/products.api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/product.context";

function ProductCard(product: IGetProduct) {
  const { decodedToken } = useContext(AuthContext);
  const { setProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateProduct, deleteProduct } = useProductApi();
  const { _id, brandName, category, discount, imageUrls, inStock, price, productDescription, productName } = product;

  const handleDeleteMutation = useMutation(
    async (id: string): Promise<void> => {
      await deleteProduct(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"])
      }
    }
  )
  return (
    <Fragment>
      <Card shadow="sm" radius="md" withBorder style={{ margin: "0.5rem", marginBlock: "1rem", padding: "2rem", width: "300px" }}>
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
          <Text style={{ marginBlock: "10px" }}>{productDescription.slice(0, 100)}...<Link to={`/admin/about/${_id}`}>see more</Link></Text>
          {
            decodedToken.roles === "admin" || decodedToken.roles === "employee"
              ?
              <Button.Group>
                <ActionIcon variant="outline" color="cyan" style={{ marginInline: "0.5rem" }} onClick={() => { setProduct(product); navigate(`/admin/${_id}`) }}><IconEdit size="1.5rem" color="blue" /></ActionIcon>
                <ActionIcon variant="outline" color="red" style={{ marginInline: "0.5rem" }} onClick={() => handleDeleteMutation.mutate(_id)}><IconTrash size="1.5rem" color="red" /></ActionIcon>
              </Button.Group>
              :
              null
          }
        </Card.Section>
      </Card>
    </Fragment>

  )
}

export default ProductCard