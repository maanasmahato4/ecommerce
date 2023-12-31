import { useState, useContext, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { AppShell, Footer, Header, MediaQuery, Burger, Text, useMantineTheme, Navbar } from "@mantine/core";
import { AuthContext } from "../context/auth.context";
import Filter from "../components/Filter";

function AdminApp() {
  const { decodedToken } = useContext(AuthContext);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Link to="/admin/" style={{ textDecoration: "none", color: "black", marginBlock: "0.5rem" }}>Statistics</Link>
            <Link to="/admin/products" style={{ textDecoration: "none", color: "black", marginBlock: "0.5rem" }}>Products</Link>
            <Link to="/admin/categories" style={{ textDecoration: "none", color: "black", marginBlock: "0.5rem" }}>Category</Link>
            {decodedToken.roles === "admin" ? <Link to="/admin/users" style={{ textDecoration: "none", color: "black", marginBlock: "0.5rem" }}>Users</Link> : <></>}
            <Link to="/admin/orders" style={{ textDecoration: "none", color: "black", marginBlock: "0.5rem" }}>Orders</Link>
            <br></br>
          <Filter />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Admin Dashboard</Text>
            </div>

            <div>
              <Link to="/" style={{ textDecoration: "none", color: "black", marginInline: "0.5rem" }}>Store</Link>
            </div>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  )
}

export default AdminApp;