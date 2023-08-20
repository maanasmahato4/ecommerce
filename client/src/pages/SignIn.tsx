import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { Fragment, useContext, useEffect } from "react";
import { useAuthApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function SignIn() {

  const navigate = useNavigate();

  const { token, setToken } = useContext(AuthContext);
  const { SignIn } = useAuthApi();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token])

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirm_password: ""
    },
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: string) => (value.length >= 8 ? null : "password must be at least 8 characters long"),
      confirm_password: (value: string) => (value.length >= 8 ? null : "password must be at least 8 characters long")
    }
  });

  async function handleSubmit(signUpData: any) {
    try {
      if (signUpData.password === signUpData.confirm_password) {
        const finalFormData = {
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
          roles: signUpData.roles
        }
        const res = await SignIn(finalFormData);
        setToken(res.data.access_token);
        form.reset();
        window.location.reload();
      } else {
        alert("passwords do not match");
      }
    } catch (error: any) {
      throw new Error(error);
    }

  };

  return (
    <Fragment>
      <h1 className="x-title">Sign In Form</h1>
      <form className="x-body" onSubmit={form.onSubmit((values) => { console.log(values); handleSubmit(values) })}>
        <TextInput className="x-input" placeholder="example: abc@gmail.com" type="text" label="Email" withAsterisk required {...form.getInputProps('email', { type: "input" })} />
        <TextInput className="x-input" label="Password" type="password" withAsterisk required {...form.getInputProps('password', { type: "input" })} />
        <TextInput className="x-input" label="Confirm Password" type="password" withAsterisk required {...form.getInputProps('confirm_password', { type: "input" })} />
        <Button.Group className="x-input">
          <Button type="submit">Submit</Button>
          <Button type="reset" color="red" onClick={() => form.reset()}>Clear</Button>
        </Button.Group>
      </form>
    </Fragment>
  )
}

export default SignIn