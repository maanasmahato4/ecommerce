import { ActionIcon, Modal, TextInput, Button, Card, Flex } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useCategoryApi } from "../api/category.api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { SuccessNotification } from "../components/Notification";
import { ICategory, ICategoryFormValues } from "../types/category.types";


function Category() {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { addCategories, getCategories, deleteCategories } = useCategoryApi();
  const form = useForm({
    initialValues: {
      category: ""
    }
  })

  const { data, isLoading, isError } = useQuery<ICategory[]>({
    queryKey: ["category"],
    queryFn: async () => await getCategories()
  })

  const handleSubmit = useMutation(
    async (category: ICategoryFormValues): Promise<void> => {
       await addCategories(category);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["category"]);
        form.reset();
      }
    }
  );

  const handleDeleteMutation = useMutation(async (id: string): Promise<void> => {
    await deleteCategories(id)
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["category"]);
      }
    }
  )



  if (isLoading) {
    return <h1>loading...</h1>
  }

  if (isError) {
    return <h1>error</h1>
  }

  return (
    <section style={{ position: "relative", minHeight: "100vh" }}>
      <Flex direction="row" justify="center" wrap="wrap" mx="auto">
        {data.map((item: any, idx: number) => {
          return <Card key={idx} shadow="lg" style={{ width: "250px", margin: "0.5rem" }}>
            <h1>{item.category}</h1>
            <Button.Group>
              <ActionIcon variant="outline" color="red" style={{ marginInline: "0.5rem" }} onClick={() => {
                handleDeleteMutation.mutate(item._id);
                SuccessNotification("Category deleted!", "red");
              }}><IconTrash size="1.5rem" color="red" /></ActionIcon>
            </Button.Group>
          </Card>
        })}
      </Flex>

      <div style={{ position: "fixed", bottom: "5rem", right: "10px" }}>
        <ActionIcon variant="filled" color="blue" size="2rem" onClick={open}>
          <IconPlus size="1rem" />
        </ActionIcon>
      </div>
      <Modal opened={opened} onClose={close} title="New Category">
        <form onSubmit={form.onSubmit((values: ICategoryFormValues) => {
          handleSubmit.mutate(values);
          SuccessNotification(`Category: ${values.category} has been created!`, "")
        })}>
          <TextInput label="Category" required withAsterisk {...form.getInputProps("category", { type: "input" })} />
          <Button.Group style={{ marginBlock: "0.7rem" }}>
            <Button type="submit">Submit</Button>
            <Button color="red" type="reset">Clear</Button>
          </Button.Group>
        </form>
      </Modal>
    </section>
  )
}

export default Category;