import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutClient from "../layouts/client";
import NotFoundPage from "../pages/NotFound";
import SigninPage from "../pages/client/signin";
import SignupPage from "../pages/client/signup";
import HomePage from "../pages/client/home/HomePage";
import ProductPage from "../pages/client/products";
import ProductDetailPage from "../pages/client/productdetail";
import ProductSale from "../pages/client/productsale";
import ContactPage from "../pages/client/contacts";
import ProfilesPage from "../pages/client/profiles";
import LayoutAdmin from "../layouts/admin";
import Dashboard from "../pages/admin/Dashboard";
import ManageUser from "../pages/admin/user";
import ClientPageCart from "../pages/client/cart/ClientPageCart";
import ManageProduct from "../pages/admin/product";
import AddProduct from "../pages/admin/product/AddProduct";
import UpdateProduct from "../pages/admin/product/UpdateProduct";
import ManageCategory from "../pages/admin/category";
import EditCategory from "../pages/admin/category/EditCategory";
import AddCategory from "../pages/admin/category/AddCategory";
import ManageComment from "../pages/admin/comment";
import ManageContact from "../pages/admin/contact";
import BillSuccess from "../pages/client/cart-succes/BillSuccess";
import TermOfServicePage from "../pages/client/tos/service/TermOfServicePage";
import WarrantyPage from "../pages/client/tos/warranty/WarrantyPage";
import RulePage from "../pages/client/tos/rules/RulePage";
import ReturnPage from "../pages/client/tos/return/ReturnPage";
import MyListBill from "../pages/client/profiles/MyListBill";
import ManageBill from "../pages/admin/bill";
import ManageBillUpdate from "../pages/admin/bill/EditBill";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="products">
            <Route index element={<ProductPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>
          <Route path="tos">
            <Route index element={<TermOfServicePage />} />
            <Route path="warranty" element={<WarrantyPage />} />
            <Route path="rule" element={<RulePage />} />
            <Route path="return" element={<ReturnPage />} />
          </Route>
          <Route path="products/sales">
            <Route index element={<ProductSale />} />
          </Route>
          <Route path="contacts" element={<ContactPage />} />
          <Route path="profiles" element={<ProfilesPage />} />
          <Route path="cart" element={<ClientPageCart />} />
          <Route path="mybill" element={<MyListBill />} />
          <Route path="billsuccess/:id" element={<BillSuccess />} />
        </Route>
        <Route path="admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="products">
            <Route index element={<ManageProduct />} />
            <Route path="add" element={<AddProduct />} />
            <Route path=":id/update" element={<UpdateProduct />} />
          </Route>
          <Route path="categories">
            <Route index element={<ManageCategory />} />
            <Route path="add" element={<AddCategory />} />
            <Route path=":id/edit" element={<EditCategory />} />
          </Route>
          <Route path="comments">
            <Route index element={<ManageComment />} />
          </Route>
          <Route path="contacts">
            <Route index element={<ManageContact />} />
          </Route>
          <Route path="accounts">
            <Route index element={<ManageUser />} />
          </Route>
          <Route path="bill">
            <Route index element={<ManageBill />} />
            <Route path=":id/edit" element={<ManageBillUpdate />} />
          </Route>
        </Route>
        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
