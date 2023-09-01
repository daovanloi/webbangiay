import { Table, Empty, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import IComment from "../../../types/comment";
import { AdGetAllComment, RemoveComment } from "../../../services/comments";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/DateUtils";

const ManageComment = () => {
  const [comments, setcoments] = useState<any>([]);
  useEffect(() => {
    AdGetAllComment().then(({ data }) => setcoments(data));
  }, []);

  const HandleRemoveComment = async (_id: string) => {
    try {
      Modal.confirm({
        title: "Confirm",
        content: "Are you sure you want to delete this about?",
        okText: "Yes",
        cancelText: "No",
        okButtonProps: {
          className:
            "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded", // áp dụng lớp CSS
        },
        onOk: async () => {
          const loading = message.loading({
            content: "Loading...",
            duration: 0,
          });
          setTimeout(async () => {
            if (loading) {
              loading();
            }
            const response = await RemoveComment(_id);
            if (response) {
              message.success("Xóa bình luận thành công!", 3);
              const dataNew = comments.filter((data: any) => data._id !== _id);
              setcoments(dataNew);
            }
          }, 2000);
        },
        onCancel: () => {
          message.success("Đã huỷ!");
        },
      });
    } catch (error: any) {
      message.error(error.response.data.message, 5);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index+1",
    },
    {
      title: "SẢN PHẨM",
      dataIndex: "nameProduct",
      render: (t: any, r: any) => (
        <Link
          target="_blank"
          to={`/products/${r.key}`}
        >{`${r.nameProduct}`}</Link>
      ),
    },
    {
      title: "THÀNH VIÊN",
      dataIndex: "nameUser",
      key: "nameUser",
    },
    {
      title: "BÌNH LUẬN",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "THỜI GIAN",
      dataIndex: "createdAt",
      render: (t: any, r: any) => <span>{`${formatDate(r.createdAt)}`}</span>,
    },
    {
      title: "HÀNH ĐỘNG",
      render: (item: IComment) => (
        <>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => HandleRemoveComment(item._id)}
          >
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  const data = comments.map((item: any, index: number) => {
    return {
      index: index + 1,
      _id: item._id,
      key: item.Product_id,
      nameProduct: item.product.name,
      nameUser: item.user.name,
      content: item.content,
      role: item.role,
      createdAt: item.createdAt,
    };
  });
  if (data.length == 0) return <Empty description={false} />;
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 8, showQuickJumper: true }}
      />
    </>
  );
};

export default ManageComment;
