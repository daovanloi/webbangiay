import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Input, Row, message, Select } from "antd";
import { UpdateBill } from "../../../services/bill";
import IBill from "../../../types/bill";
import { GetOneBill } from "../../../services/bill";

const ManageBillUpdate = () => {
  const navigate = useNavigate();
  const { id }: string | any = useParams();
  const onFinish = async (values: IBill) => {
    const key = "loading";
    try {
      const loading = await message.loading({
        content: "loading!",
        key,
        duration: 2,
      });
      if (loading) {
        const response = await UpdateBill(values);
        if (response)
          message.success("Cập nhật trạng thái đơn hàng thành công", 3);
        navigate("/admin/bill");
      }
    } catch (error: any) {
      message.error(error.response.data.message, 5);
    }
  };
  const [bill, setBill] = useState<IBill | undefined>();
  useEffect(() => {
    GetOneBill(id).then(({ data }) => setBill(data));
  }, []);
  if (!bill) return null;
  const initial = {
    _id: bill._id,
    name: bill.name,
    status: bill.status,
  };
  return (
    <Form
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      initialValues={initial}
    >
      <Row gutter={50}>
        <Col span={12}>
          <Form.Item hidden label="Trạng thái đơn hàng"></Form.Item>
          <Form.Item hidden label="_id" name="_id">
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ message: "Không được bỏ trống!", required: true }]}
          >
            <Select>
              <Select.Option
                value="Đang giao"
                selected={bill.status === "Đang giao"}
              >
                Đang giao
              </Select.Option>
              <Select.Option
                value="Chờ duyệt"
                selected={bill.status === "Chờ duyệt"}
              >
                Chờ duyệt
              </Select.Option>
              <Select.Option
                value="Hủy đơn"
                selected={bill.status === "Hủy đơn"}
              >
                Hủy đơn
              </Select.Option>
              <Select.Option
                value="Giao thành công"
                selected={bill.status === "Giao thành công"}
              >
                Giao thành công
              </Select.Option>
            </Select>
          </Form.Item>
          {/*  */}
        </Col>
      </Row>
      <Button type="primary" className="bg-blue-500" htmlType="submit">
        cập nhật
      </Button>
    </Form>
  );
};

export default ManageBillUpdate;
