import {useContext, useEffect} from "react";
import { CheckOutContext } from "../context/checkout.context";
import { Card, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ICartProduct } from "../types/product.types";
import { AuthContext } from "../context/auth.context";
import { useOrderApi } from "../api/order.api";
import { SuccessNotification } from "../components/Notification";

interface FormData {
  name: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  cartItems: Array<ICartProduct>
}


function CheckOut() {
  const {checkOutList} = useContext(CheckOutContext);
  const {decodedToken} = useContext(AuthContext);
  const {addOrder} = useOrderApi();
  const form = useForm<FormData>({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      status: "unlisted",
      cartItems: []
    }
  });

  const {setFieldValue} = form;

  useEffect(() => {
    setFieldValue("name", decodedToken.username);
    setFieldValue("email", decodedToken.email);
  }, [decodedToken])

  useEffect(() => {
    setFieldValue("cartItems", checkOutList);
  }, [checkOutList])

  const handleSubmit = async (values: FormData) => {
    const finalData = {userId: decodedToken.id, ...values}
    await addOrder(finalData);
    SuccessNotification("New order placed!", "")
    form.reset();
  };
  return (
    <Card style={{ margin: "0 auto" }}>
      <h1 style={{textAlign: "center"}}>Check Out</h1>
      <form onSubmit={form.onSubmit((values) => { handleSubmit(values); })}>
        <TextInput className="x-input" placeholder="example: jason" type="text" label="Name" withAsterisk required {...form.getInputProps("name", { type: "input" })} />
        <TextInput className="x-input" placeholder="example: abc@gmail.com" type="text" label="Email" withAsterisk required {...form.getInputProps('email', { type: "input" })} />
        <TextInput className="x-input" label="Address" type="text" withAsterisk required {...form.getInputProps("address", { type: "input" })} />
        <TextInput className="x-input" label="Phone" type="text" withAsterisk required {...form.getInputProps("phone", { type: "input" })} />
        <Button.Group className="x-input">
          <Button type="submit">Submit</Button>
          <Button type="reset" color="red">Clear</Button>
        </Button.Group>
      </form>
    </Card>
  )
}

export default CheckOut