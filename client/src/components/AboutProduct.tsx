import { useContext } from "react";
import { ProductContext } from "../context/product.context";
import { Card, Image, Group, Badge, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

function AboutProduct() {
  const { product } = useContext(ProductContext);
  const { brandName, category, discount, imageUrls, inStock, price, productDescription, productName } = product;
  return (
    <Card shadow="md" padding="md" style={{padding: "2rem"}}>
        <Card.Section mx="auto">
          <Carousel>
            {imageUrls.map((image: string, idx: number) => {
              return <Carousel.Slide key={idx}>
                <Image src={image} style={{ maxHeight: "300px", maxWidth: "300px", marginInline: "auto" }} alt={productName} />
              </Carousel.Slide>
            })}
          </Carousel>
        </Card.Section>
        { /* RESPONSIVE BHAYEKO XAINA HAI FIX IT */ }
        <Card.Section>
          <h1>{productName}</h1>
          <p>Product Description: {productDescription}</p>
          <p>Category: {category}</p>
          <p>Brand: {brandName}</p>
          <Group position="apart">
            <div>
              <Badge color="pink" variant="light">
                {discount}% off
              </Badge>
              <Text>${price}</Text>
            </div>
            <h3>InStock: {inStock}</h3>
          </Group>
        </Card.Section>
    </Card>
  )
}

export default AboutProduct;