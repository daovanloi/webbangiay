import { Table, Button, Empty, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/DateUtils";
import { GetAllBill } from "../../../services/bill";
import { formatMoney } from "../../../utils/MoneyUtils";

const ManageBill = () => {
  const [bills, setBills] = useState<any>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null); // Thêm state để lưu trữ giá trị của trạng thái được chọn

  useEffect(() => {
    GetAllBill().then(({ data }) => setBills(data));
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index+1",
    },
    {
      title: "MÃ ĐƠN",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "THÔNG TIN NGƯỜI MUA",
      dataIndex: "name",
      render: (e: any, r: any) => (
        <div>
          <Link target="_blank" to={`/products/${r.key}`}>
            Tên: <span className="font-bold">{`${r.name}`}</span>
          </Link>
          <p>
            Email: <span className="font-bold">{`${r.email}`}</span>{" "}
          </p>
          <p>
            Điện thoại: <span className="font-bold">{`${r.tel}`}</span>{" "}
          </p>
        </div>
      ),
    },
    {
      title: "GIÁ TRỊ ĐƠN HÀNG",
      dataIndex: "total",
      render: (t: any, r: any) => (
        <h5 className="text-red-600 font-medium">{`${r.total}`}</h5>
      ),
    },
    {
      title: "CHI TIẾT ĐƠN HÀNG",
      dataIndex: "items",
      render: (t: any, r: any) => (
        <div>
          {r.items.map((item: any) => (
            <div className="flex items-center" key={item._id}>
              <img className="w-8 h-8 my-2 mr-2" src={item.image} alt="" />
              <p>
                {item.name} [{item.size}] x {item.quantity}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "NGÀY ĐẶT HÀNG",
      dataIndex: "createdAt",
      render: (t: any, r: any) => <span>{`${formatDate(r.createdAt)}`}</span>,
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "HÀNH ĐỘNG",
      render: (item: any) => (
        <>
          <Link to={`${item.key}/edit`}>
            <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <EditOutlined />
            </button>
          </Link>
        </>
      ),
    },
  ];

  const data = bills.map((item: any, index: number) => {
    return {
      index: index + 1,
      key: item._id,
      email: item.email,
      name: item.name,
      items: item.items,
      tel: "0" + item.phone,
      address: item.address,
      createdAt: item.createdAt,
      status: item.status,
      code: item.orderCode,
      total: formatMoney(item.total),
    };
  });

  const filteredData = filterStatus
    ? data.filter((item: any) => item.status === filterStatus)
    : data; // Lọc dữ liệu theo giá trị của trạng thái được chọn

  if (data.length === 0) return <Empty description={false} />;
  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <select
          className="border"
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus || ""}
        >
          <option value="">Tất cả</option>
          <option value="Giao thành công">Giao thành công</option>
          <option value="Chờ duyệt">Chờ duyệt</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Hủy đơn">Hủy đơn</option>
        </select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData} // Sử dụng dữ liệu đã lọc
        bordered
        pagination={{ pageSize: 8, showQuickJumper: true }}
      />
    </>
  );
};

export default ManageBill;
