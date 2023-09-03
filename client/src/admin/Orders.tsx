import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useOrderApi } from "../api/order.api";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import OrderCard from "../components/OrderCard";
import { Modal, Radio, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SuccessNotification } from "../components/Notification";

function ManageOrders() {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const [item, setItem] = useState<any>();
  const [selectedItemStatus, setSelectedItemStatus] = useState<string>("unlisted");
  const { getAllOrders, updateOrder } = useOrderApi();
  const { decodedToken } = useContext(AuthContext);
  const ordersQuery = useQuery({
    queryKey: ["orders", decodedToken],
    queryFn: async () => await getAllOrders()
  });

  const handleStatusMutation = useMutation(async (values: any) => {
    const id = values._id;
    let item = {...values, status: selectedItemStatus};
    await updateOrder(id, item);
    SuccessNotification("Status updated!", "");
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    }
  }
  )


  if (ordersQuery.isLoading) {
    return <h1>loading..</h1>
  }

  if (ordersQuery.isError) {
    return <h1>error..</h1>
  }

  const options = [
    { value: "unlisted", label: "Unlisted" },
    { value: "cancelled", label: "Cancelled" },
    { value: "processing", label: "Processing" },
    { value: "delivered", label: "Delivered" }
  ]
  return (
    <div style={{ margin: "0.5rem" }}>
      {ordersQuery.data.map((item: any, idx: number) => {
        const totalPrice = item.cartItems.reduce((total: number, cartItem: any) => {
          const price = cartItem.product.price;
          const quantity = cartItem.quantity;
          return total + (price * quantity);
        }, 0);
        return <OrderCard key={idx} item={item} totalPrice={totalPrice} open={open} setItem={(item: any) => setItem(item)} setStatus={(value: string) => setSelectedItemStatus(value)} />
      })}
      <Modal opened={opened} onClose={close} title="Select Status">
        <Radio.Group>
          {options.map((option: any, idx: number) => {
            return <Radio value={option.value} label={option.label} key={idx} style={{ marginBlock: "0.5rem" }} checked={selectedItemStatus === option.value} onClick={() => setSelectedItemStatus(option.value)} />
          })}
        </Radio.Group>
        <Button style={{marginBlock: "0.5rem"}} onClick={() => {handleStatusMutation.mutate(item); close()}}>Update</Button>
      </Modal>
    </div>
  )
}

export default ManageOrders;