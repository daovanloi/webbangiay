import { useState, useEffect } from "react";
import { Empty, Modal, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { IProduct } from "../../../types/product";
import { GetAllProduct, RemoveProduct } from "../../../services/product";
import { formatDate } from "../../../utils/DateUtils";
import { formatMoney } from "../../../utils/MoneyUtils";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
  useEffect(() => {
    GetAllProduct().then(({ data }) => {
      setProducts(data);
    });
  }, []);
  const HandleRemoveProduct = async (id: string) => {
    try {
      Modal.confirm({
        title: "Thông báo",
        content: "Bạn có chắc chắn xoá sản phẩm này không ?",
        okText: "Xoá",
        cancelText: "Huỷ",
        okButtonProps: {
          className:
            "bg-green-500 hover:bg-green-700 text-white font-bold rounded", // áp dụng lớp CSS
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
            const response = await RemoveProduct(id);
            if (response) {
              message.success("Sản phẩm thành công!", 3);
              const dataNew = products?.filter((data) => data._id !== id);
              setProducts(dataNew);
            }
          }, 2000);
        },
        onCancel: () => {
          message.success("Đã huỷ !");
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
    },
    {
      title: "TÊN",
      dataIndex: "name",
      render: (t: any, r: any) => (
        <Link to={`/products/${r.key}`} target="_blank">{`${r.name}`}</Link>
      ),
    },
    {
      title: "GIÁ",
      dataIndex: "price",
      render: (t: any, r: any) => (
        <h5 className="text-red-600 font-medium">{`${r.price}`}</h5>
      ),
    },
    {
      title: "ẢNH",
      dataIndex: "image",
      width: 100,
      maxWidth: 100,
      render: (t: any, r: any) => <img src={`${r.image}`} />,
    },
    {
      title: "KÍCH THƯỚC",
      dataIndex: "sizes",
      render: (t: any, r: any) => (
        <div className="flex">
          <div className="border border-gray-300">
            <div className="border-b border-gray-300 font-semibold  px-3">
              Size
            </div>
            <div className="font-semibold text-center">SL</div>
          </div>
          {r.sizes.map((item: any, index: number) => (
            <div
              key={index}
              className="border-b border-t border-r border-gray-300"
            >
              <div className="border-b border-gray-300 font-semibold px-3">
                {item.size}
              </div>
              <div className="text-center">{item.quantity}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "NGÀY TẠO",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "HÀNH ĐỘNG",
      render: (item: IProduct) => (
        <>
          <Link
            to={`/admin/products/${item.key}/update`}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <EditOutlined />
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => HandleRemoveProduct(item.key)}
          >
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  const data = products?.map((item: IProduct, index: number) => {
    return {
      index: index + 1,
      key: item._id,
      name: item.name,
      price: formatMoney(item.price),
      image: item.images[0],
      sizes: item.sizes,
      createdAt: formatDate(item.createdAt),
    };
  });
  if (data?.length == 0) return <Empty description={false} />;
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 7, showQuickJumper: true }}
      />
    </>
  );
};

export default ManageProduct;
