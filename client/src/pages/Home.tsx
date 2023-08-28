import { useContext, useEffect, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Menu,
  Indicator,
  ActionIcon,
  Group,
  Flex
} from '@mantine/core';
import { IconShoppingCart, IconUser } from "@tabler/icons-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import { useAuthApi } from '../api/auth.api';
import "../styles/home.css";
import { ProductProvider } from '../context/product.context';


function Home() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { token } = useContext(AuthContext);
  const { SignOut } = useAuthApi();

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
  }, [])

  return (
    <ProductProvider>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Link to="/" className="x-nav-links">Store</Link>
            <Link to="/orders" className="x-nav-links">Orders</Link>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Text>Maanas Store</Text>
              </div>
              <Flex direction="row">
                <Link to="/admin" style={{ textDecoration: "none", color: "black", marginInline: "1rem" }}>Dashboard</Link>
                <Link to="/cart" style={{ textDecoration: "none", marginInline: "1rem" }}>
                  <Group position='center'>
                    <Indicator color='red' disabled>
                      <ActionIcon size="2rem">
                        <IconShoppingCart />
                      </ActionIcon>
                    </Indicator>
                  </Group>
                </Link>
                <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                  <Menu.Target>
                    <ActionIcon size="2rem" color='blue'><IconUser /></ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>
                      <Link to="/orders" style={{ textDecoration: "none", color: "black" }}>Orders</Link>
                    </Menu.Item>
                    <Menu.Item>
                      <span onClick={() => { SignOut(); window.location.reload(); }}>Log Out</span>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            </div>
          </Header>
        }
      >
        <Outlet />
      </AppShell>
    </ProductProvider>
  )
}

export default Home;