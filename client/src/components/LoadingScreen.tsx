import { Loader } from "@mantine/core";

export const LoadingScreen = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Loader />
    </div>
}