import { notifications } from "@mantine/notifications";

export const SuccessNotification = (message: string, color: string) => {
    return notifications.show({
        color: color === "" ? "blue" : color,
        message: message,
        autoClose: 3000,
        style: { marginBottom: "2rem" }
    })
}

export const ErrorNotification = (message: string, color: string) => {
    return notifications.show({
        title: "Error!",
        color: color === "" ? "blue" : color,
        message: message,
        autoClose: 3000,
        style: { marginBottom: "2rem" }
    })
}




