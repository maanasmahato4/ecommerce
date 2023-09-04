import { Fragment, useContext, useEffect } from "react";
import { TextInput, Button,Flex } from "@mantine/core";
import "../styles/form.css";
import { useForm } from "@mantine/form";
import { useAuthApi } from "../api/auth.api";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate();

  const { token, setToken } = useContext(AuthContext);
  const { SignUp } = useAuthApi();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token])

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      roles: 'user'
    },
    validate: {
      username: (value) => (value.length >= 6 ? null : "username must be at least 6 characters long"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 8 ? null : 'password must be at least 8 characters long'),
      confirm_password: (value) => (value.length >= 8 ? null : 'password must be at least 8 characters long')
    }
  })

  async function handleSubmit(signUpData: any) {
    try {
      if (signUpData.password === signUpData.confirm_password) {
        const finalFormData = {
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
          roles: signUpData.roles
        }
        const res = await SignUp(finalFormData);
        setToken(res.data.access_token);
        form.reset();
        window.location.reload();
      } else {
        alert("passwords do not match");
      }
    } catch (error: any) {
      throw new Error(error);
    }

  }

  return (
    <Fragment>
      <h1 className="x-title">Sign Up Form</h1>
      <form className="x-body" onSubmit={form.onSubmit((values) => { handleSubmit(values); })}>
        <TextInput className="x-input" placeholder="example: jason" type="text" label="Username" withAsterisk required {...form.getInputProps('username', { type: "input" })} />
        <TextInput className="x-input" placeholder="example: abc@gmail.com" type="text" label="Email" withAsterisk required {...form.getInputProps('email', { type: "input" })} />
        <TextInput className="x-input" label="Password" type="password" withAsterisk required {...form.getInputProps('password', { type: "input" })} />
        <TextInput className="x-input" label="Confirm Password" type="password" withAsterisk required {...form.getInputProps('confirm_password', { type: "input" })}
        />
        <Flex direction="row" justify="space-between">
          <Button.Group className="x-input">
            <Button type="submit">Submit</Button>
            <Button type="reset" color="red">Clear</Button>
          </Button.Group>
          <Button className="x-input" onClick={() => navigate("/signin")}>Already have an account?</Button>
        </Flex>
      </form>
    </Fragment>
  )
}

export default SignUp