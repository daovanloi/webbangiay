import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICartItem } from "../../types/cart";
import { formatMoney } from "../../utils/MoneyUtils";
type Props = {
  data: undefined | any;
  onHandleRemoveItemCart(id: string): void;
  onHandleCheckouts(e: any, valNote: String): void;
};
const ClientExistsCart = ({
  data,
  onHandleRemoveItemCart,
  onHandleCheckouts,
}: Props) => {
  const [note, setNote] = useState<String>("");
  if (data?.length > 0) {
    const [sumMoney, setSumMoney] = useState<Number>(0);
    let sum = 0;
    useEffect(() => {
      const nice = data.map((item: ICartItem) => {
        sum += item.quantity * item.price;
        setSumMoney(sum);
        return false;
      });
    }, [data]);
    function onHandleSubmit(e: any) {
      e.preventDefault();
      onHandleCheckouts(e, note);
    }
    return (
      <div className="">
        <h3 className="text-center my-4 text-gray-500">
          Có {data.length} sản phẩm trong giỏ hàng
        </h3>
        <div className="w-full flex justify-center items-center">
          <div className="w-[70px] bg-gray-700 h-1"></div>
        </div>
        <aside className="md:py-9 py-3">
          {data.map((item: ICartItem, index: number) => {
            return (
              <div
                key={index}
                className="flex md:px-[10%] relative max-md:py-2"
              >
                <div className="w-[130px] md:m-2">
                  <img src={item.image} className="w-full" alt="" />
                </div>
                <div className="w-full md:pl-9 md:pt-2 max-md:pl-3">
                  <h3 className="font-bold md:text-lg md:pr-6">{item.name}</h3>
                  <p className="text-red-500"> {formatMoney(item.price)}</p>
                  <p className="text-sm font-bold text-neutral-700">
                    {" "}
                    {item.size}
                  </p>
                  <div className="flex justify-between">
                    <div className="text-[13px] font-semibold text-[#55657e]">
                      SL x {item.quantity}
                    </div>
                    <div className="text-red-500">
                      {formatMoney(item.price * item.quantity)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onHandleRemoveItemCart(String(item._id))}
                    className="absolute top-0 right-0 md:pr-[10%] cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark text-xl"></i>
                  </button>
                </div>
              </div>
            );
          })}

          <form onSubmit={onHandleSubmit}>
            <div className="flex max-md:flex-col md:justify-between md:items-center md:py-5 md:px-[10%]">
              <div className="max-md:order-1 max-md:w-full max-md:my-3">
                <textarea
                  className="w-full bg-white border-2 border-gray-300 shadow-lg px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
                  rows={5}
                  cols={60}
                  placeholder="Ghi chú"
                  x-ref="textarea"
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
              <div className="max-md:order-2 max-md:w-full max-md:py-3">
                <div className="flex justify-end">
                  <div>
                    <span className="font-medium text-gray-700">
                      Tổng tiền :{" "}
                    </span>{" "}
                    <span className="md:text-2xl md:font-semibold text-red-500">
                      {formatMoney(sumMoney)}
                    </span>
                  </div>
                </div>
                <div className="flex max-md:justify-between gap-3 md:py-5">
                  <Link to={"/products"}>
                    <button
                      type="button"
                      className="text-white bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm md:px-4 md:my-2 md:py-3 md:text-base uppercase px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50"
                    >
                      Tiếp tục mua hàng
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="text-white bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm md:px-4 md:my-2 md:py-3 md:text-base uppercase px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mb-2"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </form>
        </aside>
      </div>
    );
  }
};
export default ClientExistsCart;
