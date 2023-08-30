import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";
import AdminApp from "./admin/App";
import Product from "./admin/Product";
import UpdateProduct from "./components/UpdateProduct";
import AboutProduct from "./components/AboutProduct";
import Category from "./admin/Category";
import User from "./admin/User";
import { ProductProvider } from "./context/product.context";
import { CategoryProvider } from "./context/category.context";
import MainStore from "./components/MainStore";
import Orders from "./pages/Orders";
import Cart from "./components/Cart";
import { CheckOutProvider } from "./context/checkout.context";
import ManageOrders from "./admin/Orders";
import Stats from "./admin/Stats";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/*" element={<Home />}>
          <Route path="" element={<MainStore />} />
          <Route path="orders" element={<Orders />} />
          <Route path="cart" element={<CheckOutProvider><Cart /></CheckOutProvider>} />
          <Route path="checkout" element={<CheckOutProvider><CheckOut/></CheckOutProvider>} />
          <Route path="about/:id" element={<AboutProduct />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/admin/*" element={<AdminApp />}>
          <Route path="" element={<Stats/>}/>
          <Route path="products" element={
            <ProductProvider>
              <CategoryProvider>
                <Product />
              </CategoryProvider>
            </ProductProvider>
          } />
          <Route path=":id" element={
            <ProductProvider>
              <CategoryProvider>
                <UpdateProduct />
              </CategoryProvider>
            </ProductProvider>
          } />
          <Route path="about/:id" element={
            <ProductProvider>
              <AboutProduct />
            </ProductProvider>
          } />
          <Route path="categories" element={
            <Category />
          } />
          <Route path="users" element={<User />} />
          <Route path="orders" element={<ManageOrders/>}/>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App