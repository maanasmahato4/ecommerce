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

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/admin/*" element={<AdminApp />}>
          <Route path="" element={
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
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App