import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/product.context";
import { Card, Text, Button } from "@mantine/core";
import { CheckOutContext } from "../context/checkout.context";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, setCartItem } = useContext(ProductContext);
  const { setCheckOutList } = useContext(CheckOutContext);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartItemsWithQuantity, setCartItemsWithQuantity] = useState<{ product: any, quantity: number }[]>([]);

  useEffect(() => {
    const newCart = cartItems.reduce((acc: { product: any, quantity: number }[], currItem) => {
      const foundItem = acc.find((item) => item.product._id === currItem._id);

      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        acc.push({ product: currItem, quantity: 1 });
      }

      return acc;
    }, []);

    setCartItemsWithQuantity(newCart);
    setTotalPrice(newCart.reduce((total, item) => total + item.product.price * item.quantity, 0));
  }, [cartItems]);



  if (cartItems.length == 0) {
    return <Card style={{ marginBlock: "1rem" }}>
      <Text>No item on cart!</Text>
    </Card>
  }

  return (
    <div>
      {cartItemsWithQuantity.map((item, idx) => {
        return <Card key={idx} style={{ marginBlock: "1rem" }}>
          <Text>{item.product.productName} x {item.quantity}</Text>
          <Text>Price: ${item.product.price * item.quantity}</Text>
        </Card>
      })}
      <div>
        <h3>Total: ${totalPrice}</h3>
        <Button.Group>
          <Button onClick={() => { setCheckOutList(cartItemsWithQuantity); setCartItem([]); navigate("/checkout") }}>Check Out</Button>
          <Button color="red" onClick={() => setCartItem([])}>Clear</Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default Cart;
