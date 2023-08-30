import { Card, Text, Accordion, Image, Group, Badge, Flex, Button, ActionIcon } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useOrderApi } from "../api/order.api";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { IconTrash, IconEdit } from "@tabler/icons-react";

function OrderCard({ item, totalPrice, open, setStatus, setItem }: any) {
    const { decodedToken } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const { updateOrder, deleteOrder } = useOrderApi();

    const handleStatusMutation = useMutation(async (values: any) => {
        let id = values._id;
        let item = { ...values, status: "cancelled" };
        await updateOrder(id, item)
    }, {
        onSuccess: () => queryClient.invalidateQueries(['orders'])
    });

    const handleDeleteMutation = useMutation(async (id: string) => {
        await deleteOrder(id);
    }, {
        onSuccess: () => queryClient.invalidateQueries(['orders'])
    });
    return (
        <Card style={{ marginBlock: "1rem" }}>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Total amount: ${totalPrice}</Text>
            <Text>Status: {item.status}</Text>
            <Accordion chevronPosition="left" defaultValue="Ordered Items">
                <Accordion.Item value="Ordered items">
                    <Accordion.Control>Ordered items</Accordion.Control>
                    <Accordion.Panel>
                        <Flex direction="row" wrap="wrap" justify="center">
                            {item.cartItems.map((cartItem: any, idx: number) => {
                                const { discount, imageUrls, price, productName } = cartItem.product;
                                return <Card key={idx} shadow="sm" radius="md" withBorder style={{ margin: "0.5rem", marginBlock: "1rem", padding: "2rem", width: "300px" }}>
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
                                    </Card.Section>
                                </Card>
                            })}
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            {
                decodedToken.roles !== 'admin' && decodedToken.roles !== 'employee'
                    ?
                    <Button style={{ marginBlock: "1rem" }} variant="outline" color="red" disabled={item.status == "delivered" || item.status == "cancelled" ? true : false} onClick={() => { handleStatusMutation.mutate(item) }}>{item.status === "cancelled" ? "Order has been cancelled" : "Cancel Order"}</Button>
                    :
                    <Button.Group>
                        <ActionIcon variant="outline" color="cyan" style={{ marginBlock: "1rem", marginRight: "1rem" }} onClick={() => { setItem(item); setStatus(item.status); open(); }}><IconEdit size="1.5rem" color="blue" /></ActionIcon>
                        {
                            decodedToken.roles !== "admin"
                                ?
                                <></>
                                :
                                <ActionIcon variant="outline" color="red" style={{ marginBlock: "1rem" }} onClick={() => handleDeleteMutation.mutate(item._id)}><IconTrash size="1.5rem" color="red" /></ActionIcon>
                        }
                    </Button.Group>
            }
        </Card>
    )
}

export default OrderCard;