import { Button, Modal, FormItemProps, Form, Input, message } from "antd";
import { createContext, useContext, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import IUser from "../../../types/user";
import { useNavigate } from "react-router-dom";
import { ForgotPass } from "../../../services/auth";
const MyFormItemContext = createContext<(string | number)[]>([]);

function toArr(
  str: string | number | (string | number)[]
): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}
const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};
const ForgotPassword = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleRecaptcha = (value: string | null) => {
    if (value) {
      setIsVerified(true);
    }
  };

  const showModalForgot = () => {
    setIsModalOpen(true);
  };

  const handleOkForgot = () => {
    setIsModalOpen(false);
  };

  const handleCancelForgot = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (value: IUser) => {
    if (isVerified == true) {
      const key = "loading";
      if (value) {
        try {
          const loading = await message.loading({
            content: "loading!",
            key,
            duration: 2,
          });
          if (loading) {
            const response: any = await ForgotPass(value);
            if (response) {
              message.success(response.message, 3);
              navigate("/");
            }
          }
        } catch (error: any) {
          message.error(error.response.data.message, 5);
        }
      }
    }
  };
  return (
    <>
      <p className="text-[14px]" onClick={showModalForgot}>
        Quên mật khẩu ?
      </p>
      <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOkForgot}
        onCancel={handleCancelForgot}
      >
        <Form
          className="mt-[30px] w-[400px] mx-auto"
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <h1 className="text-center mt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Quên mật khẩu ?
          </h1>
          <MyFormItem
            className="text-black font-bold"
            name="email"
            label="Email"
            rules={[
              {
                message: "vui lòng nhập email!",
                required: true,
                type: "email",
              },
            ]}
          >
            <Input
              className="border font-mono border-indigo-600 h-10"
              placeholder="nhập email"
            />
          </MyFormItem>
          <MyFormItem>
            <ReCAPTCHA
              className=""
              ref={recaptchaRef}
              sitekey="6Ld_Ek8mAAAAAKtnDYdUCNiClx9m52L_aafio6we"
              onChange={handleRecaptcha}
            />
            {isVerified ? (
              <p>Xác thực thành công!</p>
            ) : (
              <p className="text-[red]">
                Vui lòng xác thực bằng Recaptcha trước khi tiếp tục.
              </p>
            )}
          </MyFormItem>
          <Button
            htmlType="submit"
            className="w-full h-[52px] text-center py-3 rounded-xl bg-[black] text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Xác nhận
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ForgotPassword;
