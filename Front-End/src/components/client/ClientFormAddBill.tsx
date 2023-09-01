import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import IUser from "../../types/user";
import { Input, Modal, message, Form, Select, Button, Checkbox } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ICartItem } from "../../types/cart";
import { CreateBill } from "../../services/bill";
import IBill, { DIBill, Itembill } from "../../types/bill";

type TProps = {
  propNote: string;
  propUser: IUser | undefined;
  propCheck: boolean;
  propToggle: Function;
};

const ClientFormAddBill = ({
  propNote,
  propUser,
  propCheck,
  propToggle,
}: TProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [modal2Open, setModal2Open] = useState(true);
  const [user, setUser] = useState<IUser | undefined>(propUser);
  const [cart, setCart] = useState<ICartItem[] | boolean | null>(false);
  useEffect(() => {
    setModal2Open(propCheck);
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      tel: user?.tel,
      address: user?.address,
      description: propNote,
      methodpay: 1,
    });
    setCart(getCart());
  }, [propCheck]);
  const onFinish = async (values: any) => {
    if (values.tos == false)
      return message.warning(
        "Chấp nhận điều khoản chính sách để tiếp tục",
        2,
        undefined
      );
    let total = 0;
    const sendCart: Itembill[] = [];
    if (typeof cart !== "boolean" && cart !== null) {
      for (const item of cart) {
        total += item.quantity * item.price;
      }
    }
    if (typeof cart !== "boolean" && cart !== null) {
      const sendData: DIBill = {
        name: values.name,
        email: values.email,
        phone: values.tel,
        address: values.address,
        items: cart,
        total: total,
        User_id: String(user?._id),
      };
      // console.log(sendData);

      message.loading("Vui lòng chờ", 1000, () => {});
      try {
        const res: any = await CreateBill(sendData);
        message.destroy();
        if (res && res?.message == "Tạo đơn hàng thành công") {
          await message.success("Lên đơn thành công !", 1.5, () => {});
          window.localStorage.setItem("cart", "[]");
          await navigate(`/billsuccess/${res.data._id}`);
          navigate(0);
        }
      } catch (error: any) {
        console.log("Lỗi rồi", error);
        message.destroy();
        await message.error(error.response.data.message, 1.5, () => {});
        window.localStorage.setItem("cart", "[]");
        return window.location.reload();
      }
    }
  };
  const onFinishFailed = (values: any) => {
    message.error("Điền đầy đủ thông tin các trường", 2, () => {});
  };
  const methodPay = [
    { _id: 1, name: "Nhận hàng thanh toán" },
    // { _id: 2, name: "Thanh toán qua MOMO" },
    // { _id: 3, name: "Thanh toán qua Zalo Pay" },
  ];
  function getCart() {
    try {
      const cartString = window.localStorage.getItem("cart");
      const localCart: ICartItem[] | null = cartString
        ? JSON.parse(cartString)
        : null;
      if (isICartItemArray(localCart)) {
        return localCart;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
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
  }
  return (
    <>
      <section className="fixed -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
        <Modal
          title="XÁC NHẬN THÔNG TIN NGƯỜI NHẬN"
          centered
          open={modal2Open}
          onCancel={() => setModal2Open(propToggle())}
          okButtonProps={{ hidden: true }}
        >
          <Form
            form={form}
            name="newProductForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{ tos: false }}
            layout="vertical"
          >
            <Form.Item
              label="Tên người nhận"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên người nhận" },
                {
                  min: 3,
                  message: "Tối thiểu 3 ký tự",
                },
                {
                  max: 128,
                  message: "Tối đa 128 ký tự",
                },
                {
                  validator: (_: any, value: string) =>
                    value && value.trim() == ""
                      ? Promise.reject(
                          new Error("Tên người nhận không được bỏ trống")
                        )
                      : Promise.resolve(),
                },
              ]}
            >
              <Input placeholder="Tên người nhận" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  message: "Email là trường bắt buộc",
                  required: true,
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Vui lòng nhập Email nhận thông báo"
              />
            </Form.Item>
            <Form.Item
              name="tel"
              label="Điện thoại"
              rules={[
                {
                  message: "Vui lòng nhập SDT",
                  required: true,
                  min: 6,
                },
              ]}
            >
              <Input type="number" placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                { required: true, message: "Địa chỉ" },
                {
                  min: 3,
                  message: "Tối thiểu 3 ký tự",
                },
                {
                  max: 128,
                  message: "Tối đa 128 ký tự",
                },
                {
                  validator: (_: any, value: string) =>
                    value && value.trim() == ""
                      ? Promise.reject(new Error("Địa chỉ không được bỏ trống"))
                      : Promise.resolve(),
                },
              ]}
            >
              <Input placeholder="Ghi chú" />
            </Form.Item>
            <Form.Item
              label="Ghi chú"
              name="description"
              rules={[
                {
                  min: 3,
                  message: "Tối thiểu 3 ký tự",
                },
                {
                  max: 256,
                  message: "Tối đa 256 ký tự",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Phương thức thanh toán"
              name="methodpay"
              rules={[{ required: true, message: "Trường này là bắt buộc" }]}
            >
              <Select>
                {methodPay?.map((method: any) => (
                  <Select.Option key={method._id} value={method._id}>
                    {method.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="tos" valuePropName="checked">
              <Checkbox>
                Chấp nhận mọi điều khoản của chúng tôi.{" "}
                <Link to={"/tos"} target="_blank" className="underline">
                  Điều khoản chính sách
                </Link>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                className="text-white bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm md:px-4 md:my-2 md:py-3 md:text-base uppercase px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mb-2"
                htmlType="submit"
              >
                Đặt hàng
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </section>
    </>
  );
};
export default ClientFormAddBill;
