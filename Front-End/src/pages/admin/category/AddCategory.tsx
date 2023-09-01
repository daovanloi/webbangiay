import { Button, Col, Form, Input, Row, message } from "antd";
import { ICategory } from "../../../types/category";
import { CreateCategory } from "../../../services/categories";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values: ICategory) => {
    const key = "loading";
    try {
      const loading = await message.loading({
        content: "loading!",
        key,
        duration: 2,
      });
      if (loading) {
        const response: any = await CreateCategory(values);
        if (response) message.success("successfully Create categories", 3);
        navigate("/admin/categories");
      }
    } catch (error: any) {
      message.error(error.response.data.message, 5);
    }
  };
  return (
    <section>
      <div className="title">
        <h2 className="text-center text-[24px] font-bold">Create Categorie</h2>
      </div>
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
      >
        <Col span={12}>
          <Form.Item
            label="name"
            name="name"
            rules={[
              { message: "Không được bỏ trống!", required: true, min: 3 },
            ]}
          >
            <Input className="w-[450px]" />
          </Form.Item>
        </Col>
        <Row>
          <Button type="primary" className="bg-blue-500" htmlType="submit">
            Thêm danh mục
          </Button>
        </Row>
      </Form>
    </section>
  );
};

export default AddCategory;
