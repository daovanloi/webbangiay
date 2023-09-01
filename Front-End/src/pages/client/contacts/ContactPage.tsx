import { Button, Form, Input } from "antd";

import { message } from "antd";
import { CreateContact } from "../../../services/contact";
const ContactPage = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  // const [messageContent, setMessageContent] = useState<{
  //   message: string;
  //   type: string;
  // } | null>(null);
  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    try {
      const key = "loading";
      const loading = await message.loading({
        content: "loading!",
        key,
        duration: 2,
      });
      if (loading) {
        const response = await CreateContact(values);
        if (response) message.success("Gửi thông tin thành công", 3);
      }
    } catch (error: any) {
      message.error(error.response.data.message, 5);
    }
    // }
  };
  return (
    <section className="my-10">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 md:gap-4 lg:gap-8 grid-cols-1">
        <div>
          {/* <img
            src="https://res.cloudinary.com/do2d1jyoh/image/upload/v1689124215/Screenshot_407_z3ksz3.png"
            alt=""
          /> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d697.39593968542!2d105.79803369783245!3d21.046789959217865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab6b960c64f3%3A0xe299d1031f8a0a95!2zQ2FvIMSR4bqzbmcgRlBUIHBvbHl0ZWNobmlj!5e0!3m2!1sen!2s!4v1689127447786!5m2!1sen!2s"
            style={{ border: 0 }}
            loading="lazy"
            className="lg:h-[1050px] md:h-[1050px] lg:block md:block w-full hidden"
          ></iframe>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">LIÊN HỆ</h1>
          <div className="my-6">
            <p className="text-gray-500">Địa chỉ chúng tôi</p>
            <h4 className="font-bold">
              Cổng số 2, Tòa nhà FPT Polytechnic, 13 phố Trịnh Văn Bô, phường
              Phương Canh, quận Nam Từ Liêm, TP Hà Nội
            </h4>
          </div>
          <div className="my-6">
            <p className="text-gray-500">Email chúng tôi</p>
            <h4 className="font-bold">abcd@fpt.edu.vn</h4>
          </div>
          <div className="my-6">
            <p className="text-gray-500">Điện thoại</p>
            <h4 className="font-bold">0123456789</h4>
          </div>
          <div className="my-6">
            <p className="text-gray-500">Hệ thống shop HN</p>
            <h4 className="font-bold">0987654321</h4>
          </div>
          <div className="my-6">
            <p className="text-gray-500">Thời gian làm việc</p>
            <h4 className="font-bold">
              Thứ 2 đến Thứ 6 từ 8h30 đến 17h30; Thứ 7 từ 8h30 đến 12h30
            </h4>
          </div>
          <hr />
          <div>
            <h2 className="text-3xl font-bold my-5">
              GỬI THẮC MẮC CHO CHÚNG TÔI
            </h2>
            <Form
              form={form}
              className="mt-[30px] w-full"
              name="form_item_path"
              layout="vertical"
              autoComplete="off"
              onFinish={handleSubmit}
            >
              <Form.Item
                className="text-black font-bold"
                rules={[
                  {
                    message: "Vui lòng nhập đầy đủ họ tên",
                    required: true,
                    min: 10,
                  },
                ]}
                name="name"
                label="Họ Tên"
              >
                <Input
                  className="font-mono border border-indigo-600 h-10"
                  placeholder="Nhập họ tên"
                />
              </Form.Item>
              <Form.Item
                className="text-black font-bold"
                name="email"
                label="Email"
                rules={[
                  {
                    message: "Vui lòng nhập email!",
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input
                  className="font-mono border border-indigo-600 h-10"
                  placeholder="Nhập email"
                />
              </Form.Item>
              <Form.Item
                className="text-black font-bold"
                name="address"
                label="Địa chỉ"
                rules={[
                  {
                    message: "Vui lòng nhập địa chỉ!",
                    required: false,
                  },
                ]}
              >
                <Input
                  className="font-mono border border-indigo-600 h-10"
                  placeholder="Địa chỉ ..."
                />
              </Form.Item>
              <Form.Item
                className="text-black font-bold"
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
                <Input
                  type="number"
                  className="font-mono border border-indigo-600 h-10"
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>
              <Form.Item
                className="text-black font-bold"
                name="message"
                label="Tin nhắn"
                rules={[
                  {
                    message: "Nhập tin nhắn!",
                    required: false,
                    min: 6,
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Nội dung tin nhắn"
                  maxLength={100}
                  className="font-mono border border-indigo-600"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                className="bg-[#FFDD00] text-white font-bold w-full py-2"
              >
                GỬI THÔNG TIN
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4">
        <div className="text-center border py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>

          <p className="my-3">GIAO HÀNG MIỄN PHÍ</p>
          <p className="my-3">
            Cho đơn hàng trên 800K (áp dụng với sản phẩm KHÔNG giảm giá)
          </p>
        </div>
        <div className="text-center border py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6z"
            />
          </svg>

          <p className="my-3">Chính sách bảo hành</p>
          <p className="my-3">Hỗ trợ khắc phục miễn phí nếu đủ điều kiện</p>
        </div>
        <div className="text-center border py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <p className="my-3">Chính sách đổi trả</p>
          <p className="my-3">Đổi hàng khi đủ điều kiện</p>
        </div>
        <div className="text-center border py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>

          <p className="my-3">Hotline Hệ Thống Cửa Hàng</p>
          <p className="my-3">0902779414</p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
