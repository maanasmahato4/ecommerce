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
  Button
} from '@mantine/core';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import { useAuthApi } from '../api/auth.api';
import "../styles/home.css";
import MainStore from '../components/MainStore';


function Home() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { token, decodedToken } = useContext(AuthContext);
  const { SignOut } = useAuthApi();

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
  }, [])

  return (
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
          <Menu>
            <Menu.Target>
              <span style={{ padding: "0.5rem", cursor: "pointer" }}>Categories</span>
            </Menu.Target>
            <Menu.Dropdown>

            </Menu.Dropdown>
          </Menu>
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
            <div>
              <Link to="/admin" style={{textDecoration: "none", color: "black", marginInline: "1rem"}}>Dashboard</Link>
              <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                <Menu.Target>
                  <Button>{decodedToken.username}</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Link to="/order" style={{ textDecoration: "none", color: "black" }}>Orders</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <span onClick={() => { SignOut(); window.location.reload(); }}>Log Out</span>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>

          </div>
        </Header>
      }
    >
      <Routes>
        <Route path='/' element={<MainStore />} />
      </Routes>
    </AppShell>
  )
}

export default Home;