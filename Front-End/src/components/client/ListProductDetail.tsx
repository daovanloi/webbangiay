import React, { useState, useContext } from "react";
import { Alert, Carousel, Form, Image, Input, Select, Space } from "antd";
import { Link } from "react-router-dom";

import { IProduct, IProductDetail } from "../../types/product";
import { ICartItem } from "../../types/cart";

import { SumCartContext } from "../../context/client/HeaderContext";
import { formatMoney } from "../../utils/MoneyUtils";

type Props = {
  product: IProductDetail;
};

const ListProductDetail = (props: Props) => {
  const sumCartContext: any = useContext(SumCartContext);
  let cart: ICartItem | undefined = undefined;
  const [notification, setNotification] = useState<boolean>(false);
  const emptyCart = window.localStorage.getItem("cart");
  if (emptyCart == null)
    window.localStorage.setItem("cart", JSON.stringify([]));
  const onFinish = async (values: IProduct) => {
    const nice: any = props.product.data;
    const convertPrice = nice.salePrice > 0 ? nice.salePrice : nice.price;
    cart = {
      _id: props.product.data._id,
      name: nice.name,
      price: convertPrice,
      size: String(values.sizes),
      quantity: Number(values.quantity),
      image: nice.images[0],
    };
    addLocalStorage(cart);
  };
  const addLocalStorage = (cart: ICartItem) => {
    // Kiểm tra xem file có thuộc định dạng JSON khum && Kiểm nó có thuộc kiểu interface ICartItem[] khum bằng Func ::: isICartItemArray()
    try {
      const cartString = window.localStorage.getItem("cart");
      const localCart: ICartItem[] | null = cartString
        ? JSON.parse(cartString)
        : null;
      if (isICartItemArray(localCart)) {
        localCart?.push(cart);
        window.localStorage.setItem("cart", JSON.stringify(localCart));
        const refreshCart: any = window.localStorage.getItem("cart");
        //====
        // Tạo một đối tượng mới để lưu trữ kết quả
        const result: any = {};
        // Duyệt qua mảng arrr
        for (const obj of JSON.parse(refreshCart)) {
          const id = obj._id;
          const quantity = obj.quantity;
          // Kiểm tra xem id đã tồn tại trong đối tượng result chưa
          if (result.hasOwnProperty(id)) {
            // Nếu đã tồn tại, thì cộng thêm quantity vào tổng quantity hiện tại
            result[id].quantity += quantity;
          } else {
            // Nếu chưa tồn tại, thì thêm mới đối tượng với id và quantity các thuộc tính tương ứng
            result[id] = {
              _id: id,
              name: obj.name,
              price: obj.price,
              image: obj.image,
              size: obj.size,
              quantity: quantity,
            };
          }
        }
        // Chuyển kết quả từ đối tượng result thành mảng
        const finalResult: any = Object.values(result);
        // Cập nhật giá trị mới cho cart
        window.localStorage.setItem("cart", JSON.stringify(finalResult));
        setNotification(!notification);
        setTimeout(() => {
          setNotification(false);
        }, 1000);
        sumCartContext.onHandleSumCart(finalResult.length);
        return;
      } else {
        setNotification(!notification);
        setTimeout(() => {
          setNotification(false);
        }, 1000);
        window.localStorage.setItem("cart", JSON.stringify([cart]));
        return;
      }
    } catch (error) {
      localStorage.removeItem("cart");
      window.localStorage.setItem("cart", JSON.stringify([cart]));
      return;
    }
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
  };
  return (
    <section className="py-10 font-poppins dark:bg-gray-800">
      {notification ? (
        <Space
          className="animate-bounce fixed mx-auto my-[1%] inset-x-0 z-30 mt-[-3%] transition duration-300 ease-in-out transform hover:-translate-y-1 w-[250px]"
          direction="vertical"
        >
          <Alert
            message="Thêm vào giỏ hàng thành công"
            className="w-[250px]"
            type="success"
            showIcon
          />
        </Space>
      ) : (
        ""
      )}
      <p className=" focus:outline-none px-4 mb-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
        <Link to="/">Trang chủ</Link> / <Link to="/products">Sản phẩm</Link> /{" "}
        {props.product.data.name}
      </p>
      <div key={props.product.data._id} className=" px-4 mx-auto">
        <div className="flex flex-wrap mb-24 -mx-4">
          <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
            <div className="sticky top-0 overflow-hidden ">
              <div className="relative mb-6 lg:mb-10 lg:h-96">
                <Carousel autoplay>
                  {props.product.data.images.map((image, index) => (
                    <div key={index}>
                      <img
                        className="object-contain w-full lg:h-full"
                        src={image}
                        alt={`Slide ${index + 1}`}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="flex-wrap hidden -mx-2 md:flex md:mt-[250px]">
                {props.product.data.images.map((image, index) => (
                  <div key={index} className="w-1/2 p-2 sm:w-1/4">
                    <div
                      key={index}
                      className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300"
                    >
                      <Image
                        className="object-contain w-full lg:h-28"
                        src={image}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <Form
              name="form_item_path"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  {props.product.data.salePrice < props.product.data.price ? (
                    <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                      sale
                    </span>
                  ) : (
                    <span></span>
                  )}

                  <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {props.product.data.name}
                  </h2>
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    {props.product.data.salePrice > 0 ? (
                      <span className="text-bold text-[red]">
                        {formatMoney(props.product.data.salePrice)}
                      </span>
                    ) : (
                      ""
                    )}
                    {props.product.data.salePrice > 0 ? (
                      <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                        {formatMoney(props.product.data.price)}
                      </span>
                    ) : (
                      <span className="text-bold text-[red]">
                        {formatMoney(props.product.data.price)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="mb-6">
                  <div>
                    <p>{props.product.data.description}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Form.Item
                    className="w-[200px]"
                    rules={[
                      {
                        message: "vui lòng nhập size!",
                        required: true,
                      },
                    ]}
                    name="sizes"
                    label="Chọn kích cỡ"
                  >
                    <Select
                      placeholder="37"
                      className="border text-black border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      options={props.product.data.sizes.map((atb) => ({
                        label: atb.size,
                        value: atb.size,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    className="w-[200px]"
                    rules={[
                      {
                        message: "Vui lòng nhập số lượng!",
                        required: true,
                      },
                    ]}
                    name="quantity"
                    label="Số lượng"
                  >
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      className="h-10"
                      placeholder="1"
                    />
                  </Form.Item>
                </div>
                <div className="flex gap-4 mb-6">
                  <button className="w-full px-4 py-3 text-center bg-black text-white rounded-xl">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ListProductDetail;
