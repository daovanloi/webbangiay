import { Table, Button, Empty, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { ICategory } from "../../../types/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GetAllCategory, RemoveCategory } from "../../../services/categories";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/DateUtils";

const ManageCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    GetAllCategory().then(({ data }) => setCategories(data));
  }, []);

  const HandleRemoveCategory = async (id: string) => {
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
            const response = await RemoveCategory(id);
            if (response) {
              message.success("Xóa danh mục thành công!", 3);
              const dataNew = categories.filter((data) => data._id !== id);
              setCategories(dataNew);
            }
          }, 2000);
        },
        onCancel: () => {
          message.success("Canceled!");
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
      key: "index",
      render: (index: any) => index + 1,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) => formatDate(createdAt),
    },

    {
      title: "Hành động",
      render: (item: ICategory) => (
        <>
          {item.name === "Không xác định" ? (
            <Button hidden>delete</Button>
          ) : (
            <button
              className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => HandleRemoveCategory(item.key)}
            >
              <DeleteOutlined />
            </button>
          )}
          {item.name === "Không xác định" ? (
            <Button hidden>delete</Button>
          ) : (
            <Link to={`${item.key}/edit`}>
              <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <EditOutlined />
              </button>
            </Link>
          )}
        </>
      ),
    },
  ];

  const data = categories.map((item: ICategory, index: number) => {
    return {
      index: index,
      key: item._id,
      name: item.name,
      //   email: item.email,
      //   role: item.role,
      createdAt: item.createdAt,
    };
  });
  if (data.length == 0) return <Empty description={false} />;
  return (
    <>
      <Link to={"add"}>
        {" "}
        <button className="bg-green-500 text-white py-3 px-5 my-4">
          Thêm danh mục
        </button>{" "}
      </Link>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 8, showQuickJumper: true }}
      />
    </>
  );
};

export default ManageCategory;
