import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsersApi } from "../api/users.api";
import { useEffect, useState } from "react";
import { Table, ActionIcon, Modal, TextInput, Button, Select, Flex } from "@mantine/core";
import { IGetUsers } from "../types/auth.types";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { SuccessNotification } from "../components/Notification";

function User() {
  const { getUsers, updateUser, deleteUser } = useUsersApi();
  const queryClient = useQueryClient();
  const [role, setRoles] = useState<string | undefined>("all");
  const [selectedUser, setSelecetedUser] = useState({ _id: "", username: "", email: "", roles: "" });
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", role],
    queryFn: async () => await getUsers(role)
  });


  const form = useForm({
    initialValues: {
      _id: selectedUser?._id,
      username: selectedUser?.username,
      email: selectedUser?.email,
      roles: selectedUser?.roles,
    }
  })

  const { setFieldValue } = form;

  useEffect(() => {
    setFieldValue("_id", selectedUser._id);
    setFieldValue("username", selectedUser.username);
    setFieldValue("email", selectedUser.email);
    setFieldValue("roles", selectedUser.roles);
  }, [selectedUser])


  const handleUpdateMutation = useMutation(async (data: any): Promise<void> => {
    await updateUser(data._id, { username: data.username, email: data.email, roles: data.roles })
    SuccessNotification("User role updated!", "");
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      form.reset();
      close();
    }
  })

  const handleDeleteMutation = useMutation(async (id: string) => {
    await deleteUser(id);
    SuccessNotification("User deleted!", "red");
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"])
      }
    }
  )

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>error</h1>
  }

  const SelectRoleData = [
    { value: "all", label: "all" },
    { value: "user", label: "user" },
    { value: "employee", label: "employee" },
    { value: "admin", label: "admin" },
  ];

  return (
    <section>
      <Flex direction="row" justify="space-between" wrap="wrap" mx="auto">
        <div></div>
        <Select label="Role" defaultValue={role} data={SelectRoleData.map((option, idx) => ({ ...option, key: idx }))} onChange={(value: any) => setRoles(value)} />
      </Flex>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: IGetUsers, idx: number) => {
            return <tr key={idx}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.roles}</td>
              <td><ActionIcon variant="outline" color="cyan" style={{ marginInline: "0.5rem" }} onClick={() => { setSelecetedUser({ _id: item._id, username: item.username, email: item.email, roles: item.roles }); open() }}><IconEdit size="1.5rem" color="blue" /></ActionIcon></td>
              <td><ActionIcon variant="outline" color="red" style={{ marginInline: "0.5rem" }} onClick={() => handleDeleteMutation.mutate(item._id)}><IconTrash size="1.5rem" color="red" /></ActionIcon></td>
            </tr>
          })}
        </tbody>
      </Table>
      <Modal opened={opened} onClose={close} title="Update Role">
        <form onSubmit={form.onSubmit(values => { handleUpdateMutation.mutate(values); })}>
          <TextInput label="Username" required withAsterisk disabled {...form.getInputProps("username", { type: "input" })} />
          <TextInput label="Email" required withAsterisk disabled {...form.getInputProps("email", { type: "input" })} />
          <Select label="Role" required withAsterisk disabled={selectedUser.roles === "admin"} data={[
            { value: "user", label: "user" },
            { value: "employee", label: "employee" }
          ]} {...form.getInputProps("roles", { type: "input" })} />
          <Button.Group style={{ marginBlock: "0.7rem" }}>
            <Button type="submit">Submit</Button>
          </Button.Group>
        </form>
      </Modal>
    </section>
  )
}

export default User;