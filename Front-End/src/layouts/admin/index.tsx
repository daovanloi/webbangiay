import { Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderLayoutAdmin from "./components/header";
import SidebarLayoutAdmin from "./components/sidebar";
import MainLayoutAdmin from "./components/main";
import { verifyToken } from "../../services/auth";
const { Footer } = Layout;
const LayoutAdmin = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const refreshTokenCore: any = localStorage.getItem("refreshToken");
  if (refreshTokenCore == null) {
    window.location.href = "/signin";
    return false;
  }
  if (!refreshTokenCore || refreshTokenCore == null) {
    window.location.href = "/signin";
    return false;
  }
  (async () => {
    try {
      const isMatch: any = await verifyToken(refreshTokenCore);
      if (!isMatch) {
        window.location.href = "/signin";
        return false;
      }
      if (isMatch.message !== "admin") {
        window.location.href = "/signin";
        return false;
      }
    } catch (error) {
      window.location.href = "/signin";
      return false;
    }
  })();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderLayoutAdmin />
      <Layout>
        <SidebarLayoutAdmin />
        <MainLayoutAdmin />
      </Layout>
      <Footer style={{ textAlign: "center" }}>ADMIN QUẢN TRỊ</Footer>
    </Layout>
  );
};

export default LayoutAdmin;
