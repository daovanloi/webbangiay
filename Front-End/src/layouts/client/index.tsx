import { Outlet } from "react-router-dom";
import HeaderLayoutClient from "./components/header";
import FooterLayoutClient from "./components/footer";
import { SumCartProvider } from "../../context/client/HeaderContext";
const LayoutClient = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-2">
        <SumCartProvider>
          <HeaderLayoutClient />
          <main>
            <Outlet />
          </main>
          <FooterLayoutClient />
        </SumCartProvider>
      </div>
    </>
  );
};

export default LayoutClient;
