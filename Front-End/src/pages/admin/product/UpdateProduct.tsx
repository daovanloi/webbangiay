import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  message,
} from "antd";
import axios from "axios";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  GetOneProduct,
  UpdateProduct as APIUpdateProduct,
} from "../../../services/product";
import { ICategory } from "../../../types/category";
import { GetAllCategory } from "../../../services/categories";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../../types/product";
const UpdateProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[] | undefined>(
    undefined
  );
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [messageApi, contextHolder] = message.useMessage();
  const [formFail, setFormFail] = useState<number>(0);
  useEffect(() => {
    GetOneProduct(String(id)).then(({ data }) => {
      setProduct(data);
      form.setFieldsValue({
        name: data?.name,
        price: data.price,
        salePrice: data?.salePrice | 0,
        CategoryId: data.CategoryId[0]._id,
        description: data.description,
        sizes: data.sizes,
        images: data.images,
      });
    });
    GetAllCategory().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  let fileListCore: any = 0;
  const beforeUpload = (e: any) => {
    fileListCore = e.target.files;
    return true;
  };
  const onFinish = async (values: any) => {
    if (fileListCore?.length > 0) {
      message.loading("Tải ảnh lên ....", 2000000, () => {});
      try {
        const formData = new FormData();
        for (const item of fileListCore) {
          formData.append("images", item);
        }
        const { data } = await axios.post(
          "https://api-poly-framework-1-5plp.onrender.com/api/images/upload",
          formData
        );
        values.images = await data.urls;
        message.destroy();
        return updateProductNow(values);
      } catch (error) {
        message.destroy();
        message.error("Tải ảnh lên thất bại", 2, () => {});
        return;
      }
    }
    updateProductNow(values);
    async function updateProductNow(values: IProduct | any) {
      setFormFail(0);
      message.loading("Vui lòng chờ ...", 2000000, () => {});
      try {
        const newSize = values.sizes.map(
          (item: { size?: string; quantity: number; _id?: string }) => {
            delete item?._id;
            return item;
          }
        );
        values.sizes = newSize;
        try {
          if (values && values !== undefined) {
            const res = await APIUpdateProduct(values, String(id));
            if (res) {
              message.destroy();
              message.success("Cập nhật sản phẩm thành công", 2, () => {
                navigate("/admin/products");
              });
            } else {
              message.destroy();
              message.error("Cập nhật sản phẩm thất bại", 2, () => {
                navigate("/admin/products");
              });
            }
          }
        } catch (error) {
          console.log(error);
          message.destroy();
          message.error("Cập nhật sản phẩm thất bại", 2, () => {});
        }
      } catch (error) {
        message.destroy();
        console.log(error);
      }
    }
  };
  const onFinishFailed = (value: any) => {
    console.log(value);
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
        <h2 className="font-bold text-2xl mb-4">Cập nhật sản phẩm</h2>
      </div>
      <Form
        name="newProductForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        form={form}
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
          label="Giảm giá"
          name="salePrice"
          rules={[{ validator: validatePrice }]}
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

        <Form.Item label="Ảnh sản phẩm" name="images">
          {/* <Upload accept="image/*" multiple beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />} block>
              Chọn ảnh
            </Button>
          </Upload> */}
          <input type="file" multiple onChange={beforeUpload} />
          <div className="flex gap-1 my-3">
            {product?.images.map((item, index: number) => (
              <img key={index} src={item} width={"64px"} />
            ))}
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="bg-blue-500" htmlType="submit">
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateProduct;
