import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import axios from "axios";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { CreateProduct } from "../../../services/product";
import { ICategory } from "../../../types/category";
import { GetAllCategory } from "../../../services/categories";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[] | undefined>(
    undefined
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [formFail, setFormFail] = useState<number>(0);
  useEffect(() => {
    GetAllCategory().then(({ data }) => {
      setCategories(data);
    });
  }, []);
  const beforeUpload = () => {
    return false;
  };
  const onFinish = async (values: any) => {
    setFormFail(0);
    try {
      const formData = new FormData();
      for (const item of values.images.fileList) {
        formData.append("images", item.originFileObj);
      }
      message.loading("Tải ảnh lên ....", 2000000, () => {});
      const { data } = await axios.post(
        "https://api-poly-framework-1-5plp.onrender.com/api/images/upload",
        formData
      );
      if (data && data.urls.length > 0) {
        values.images = data.urls;
        message.destroy();
        message.loading("Vui lòng chờ ....", 2000000, () => {});
        try {
          const res = await CreateProduct(values);
          if (res) {
            message.destroy();
            message.success("Thêm sản phẩm thành công", 2, () => {
              navigate("/admin/products");
            });
          } else {
            message.destroy();
            message.error("Thêm sản phẩm thất bại", 2, () => {
              navigate("/admin/products");
            });
          }
        } catch (error) {
          message.destroy();
          message.error("Thêm sản phẩm thất bại", 2, () => {});
        }
      }
    } catch (error) {
      console.log(error);
      message.destroy();
      message.error("Lỗi tải lên hình ảnh ...", 2, () => {});
    }
  };

  const onFinishFailed = () => {
    setFormFail(1);
  };
  const validatePrice = (_: any, value: number) => {
    if (value < 0) {
      return Promise.reject(new Error("Không phải là số âm"));
    }
    return Promise.resolve();
  };
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        {formFail == 1 && (
          <Alert
            message="Điền đầy đủ thông tin vào nhé"
            type="error"
            showIcon
          />
        )}
        {contextHolder}
      </Space>

      <div>
        <h2 className="font-bold text-2xl mb-4">Thêm sản phẩm</h2>
      </div>
      <Form
        name="newProductForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
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
                      new Error("Tên sản phẩm không được bỏ trống")
                    )
                  : Promise.resolve(),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập giá sản phẩm" },
            { validator: validatePrice },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Kích thước"
          name="sizes"
          rules={[{ required: true, message: "Vui lòng nhập kích thước" }]}
        >
          <Form.List name="sizes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "size"]}
                      rules={[
                        {
                          required: true,
                          message: "Tên size không được bỏ trống",
                        },
                        {
                          validator: (_: any, value: string) =>
                            value && value.trim() == ""
                              ? Promise.reject(
                                  new Error("Tên size không được bỏ trống")
                                )
                              : Promise.resolve(),
                        },
                      ]}
                    >
                      <Input placeholder="Size" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Số lượng là trường bắt buộc",
                        },
                        { validator: validatePrice },
                      ]}
                    >
                      <InputNumber placeholder="Số lượng" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="Danh mục"
          name="CategoryId"
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Select>
            {categories?.map((category: any) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          name="images"
          rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
        >
          <Upload accept="image/*" multiple beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />} block>
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="bg-blue-500" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
