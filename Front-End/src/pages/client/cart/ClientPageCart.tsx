import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ICartItem } from "../../../types/cart";
import ClientEmptyCart from "../../../components/client/ClientEmptyCart";
import ClientExistsCart from "../../../components/client/ClientExistsCart";
import { SumCartContext } from "../../../context/client/HeaderContext";
import IBill from "../../../types/bill";
import ClientFormAddBill from "../../../components/client/ClientFormAddBill";
import { GetOneUser } from "../../../services/user";
import { message } from "antd";
import IUser from "../../../types/user";
const ClientPageCart = () => {
  const sumCartContext = useContext(SumCartContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState<ICartItem[] | undefined>(undefined);
  const [load, setLoad] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [formBill, setFormBill] = useState<IBill | undefined | any>(undefined);
  const [toggle, setToggle] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  useEffect(() => {
    const cartCore = window.localStorage.getItem("cart");
    if (!cartCore) {
      setLoad(!load);
      return;
    } else {
      try {
        if (isICartItemArray(JSON.parse(cartCore))) {
          setCart(JSON.parse(cartCore));
        }
      } catch (error) {
        // console.log(error);
      }
      setLoad(!load);
      return;
    }
  }, []);
  function isICartItemArray(arr: any) {
    let checker: boolean = true;
    if (Array.isArray(arr)) {
      arr.map((item) => {
        if (
          !(
            typeof item._id === "string" &&
            typeof item.name === "string" &&
            typeof item.image === "string" &&
            typeof item.size === "string" &&
            typeof item.price === "number" &&
            typeof item.quantity === "number"
          )
        ) {
          checker = false;
        }
      });
      return checker;
    } else {
      checker = false;
      return checker;
    }
  }
  function onHandleRemoveItemCart(id: string) {
    const beforeCart = cart?.filter((item) => item._id !== id);
    if (beforeCart?.length == 0) window.location.reload();
    sumCartContext?.onHandleSumCart(Number(beforeCart?.length));
    window.localStorage.setItem("cart", JSON.stringify(beforeCart));
    setCart(beforeCart);
    return;
  }
  async function onHandleCheckouts(e: any, value: String) {
    await getData();
    setNote(String(value));
    toggleForm();
    if (e) {
      setFormBill(true);
    }
  }
  const getData = async () => {
    try {
      const dataCore: any = window.localStorage.getItem("user");
      const userJSON = JSON.parse(dataCore);
      if (!userJSON) {
        message.warning("Đăng nhập để đặt hàng", 2, () => {});
        return navigate("/signin");
      }
      const { data } = await GetOneUser(userJSON._id);
      setUser(data);
    } catch (error) {
      console.log(error);
      message.warning("Đăng nhập để đặt hàng", 2, () => {});
      return navigate("/signin");
    }
  };
  function toggleForm() {
    setToggle(!toggle);
    return !toggle;
  }
  if (load) return;
  return (
    <>
      {formBill ? (
        <ClientFormAddBill
          propNote={note}
          propUser={user}
          propCheck={toggle}
          propToggle={toggleForm}
        />
      ) : (
        ""
      )}
      <section className="min-h-[60vh]">
        <div className="w-full m-auto">
          <div className="min-w-full flex md:py-3 py-1 my-2 bg-gray-100 text-gray-600">
            <Link to={"/"} className="mx-3">
              Trang chủ
            </Link>{" "}
            /
            <Link to={"/cart"} className="mx-3">
              Giỏ hàng
            </Link>
          </div>
          <div className="md:py-8">
            <h1 className="text-center font-semibold md:text-3xl text-xl my-3">
              Giỏ hàng của bạn
            </h1>
            <ClientExistsCart
              onHandleRemoveItemCart={onHandleRemoveItemCart}
              data={cart}
              onHandleCheckouts={onHandleCheckouts}
            />
            <ClientEmptyCart data={cart} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientPageCart;
