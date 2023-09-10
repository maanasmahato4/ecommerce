import { useQuery } from "@tanstack/react-query";
import { useOrderApi } from "../api/order.api";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import OrderCard from "../components/OrderCard";
import { IGetOrder, IOrder } from "../types/order.types";

function Orders() {
  const { getOrders } = useOrderApi();
  const { decodedToken } = useContext(AuthContext);
  const ordersQuery = useQuery({
    queryKey: ["orders", decodedToken],
    queryFn: async () => await getOrders(decodedToken.id)
  });

  if (ordersQuery.isLoading) {
    return <h1>loading..</h1>
  }

  if (ordersQuery.isError) {
    return <h1>error..</h1>
  }

  return (
    <div>
      {ordersQuery.data.map((item: IGetOrder, idx: number) => {
        const totalPrice = item.cartItems.reduce((total: number, cartItem: any) => {
          const price = cartItem.product.price;
          const quantity = cartItem.quantity;
          return total + (price * quantity);
        }, 0);
        return <OrderCard key={idx} item={item} totalPrice={totalPrice}/>
      })}
    </div>
  )
}

export default Orders;