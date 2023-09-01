import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../../utils/DateUtils";
import { Link, useNavigate } from "react-router-dom";
import { GetBillFollowUser } from "../../../services/user";
import IBill from "../../../types/bill";
import { ICartItem } from "../../../types/cart";
import { formatMoney } from "../../../utils/MoneyUtils";
import { UpdateBill } from "../../../services/bill";

const MyListBill = () => {
  const navigate = useNavigate();
  const [myBill, setMyBill] = useState<any>(undefined);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const dataCore: any = window.localStorage.getItem("user");
      const userJSON = JSON.parse(dataCore);
      if (!userJSON) return navigate("/signin");
      const resMyBill: any = await GetBillFollowUser(userJSON._id);
      setMyBill(resMyBill);
    } catch (error) {
      console.log(error);
      setMyBill(undefined);
      // navigate("/signin");
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (key: number) => key,
    },
    {
      title: "Đơn hàng",
      dataIndex: "products",
      key: "products",
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (products: ICartItem[]) => (
        <div>
          {products.map((item: any, index: any) => (
            <div key={index + 1}>
              <Link to={`/products/${item._id}`} target="_blank">
                {item.name}
              </Link>
              <h6 className="font-medium">x {item.quantity}</h6>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Người nhận",
      dataIndex: "receiver",
      key: "receiver",
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (receiver: any) => (
        <>
          <h5 className="font-semibold text-gray-800">Tên : {receiver.name}</h5>
          <h5 className="font-semibold text-gray-800">
            Điện thoại :{" "}
            <span className="font-normal text-gray-800">{receiver.tel}</span>
          </h5>
          <h5 className="font-semibold text-gray-800">
            Email :{" "}
            <span className="font-normal text-gray-800">{receiver.email}</span>
          </h5>
          <h5 className="font-semibold text-gray-800">
            Địa chỉ :{" "}
            <span className="font-normal text-gray-800">
              {receiver.address}
            </span>
          </h5>
          <h5 className="font-semibold text-red-500">
            Tổng : {formatMoney(receiver.total)}
          </h5>
        </>
      ),
    },
    {
      title: "Thông tin",
      dataIndex: "noname",
      key: "noname",
      render: (noname: any) => (
        <React.Fragment>
          <div>
            <h5 className="font-semibold text-gray-800">{noname.i}</h5>
            <h5 className="font-semibold text-gray-800">
              Tên : {noname.item.name}
            </h5>
            <h5 className="font-semibold text-gray-800">
              Điện thoại :{" "}
              <span className="font-normal text-gray-800">
                {noname.item.phone}
              </span>
            </h5>
            <h5 className="font-semibold text-gray-800">
              Email :{" "}
              <span className="font-normal text-gray-800">
                {noname.item.email}
              </span>
            </h5>
            <h5 className="font-semibold text-gray-800">
              Địa chỉ :{" "}
              <span className="font-normal text-gray-800">
                {noname.item.address}
              </span>
            </h5>
            <h5 className="font-semibold text-red-500">
              Tổng : {formatMoney(noname.item.total)}
            </h5>
          </div>
          <div className="py-2">
            <hr />
          </div>
          <div>
            {noname.item.items.map((item: any, index: any) => (
              <div key={index + 1}>
                <Link to={`/products/${item._id}`} target="_blank">
                  {item.name}
                </Link>
                <h6 className="font-medium">x {item.quantity}</h6>
              </div>
            ))}
          </div>
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => a.to - b.to,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (status: any) => (
        <>
          <span className="font-semibold text-gray-800">{status.name}</span>
          {status.name == "Chờ duyệt" ? (
            <button
              onClick={() => onHandleUpdate(status.id)}
              type="button"
              className="focus:outline-none text-red-600 text-sm mt-2 py-1 md:py-1 px-2 md:px-4 rounded-md border border-red-600 hover:bg-red-50 flex items-center"
            >
              Huỷ đơn
            </button>
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: any, b: any) => a.to - b.to,
      sortDirections: ["descend", "ascend"],
      responsive: ["sm"],
      render: (createdAt: any) => formatDate(createdAt),
    },
    {
      title: "Trạng thái",
      dataIndex: "noname",
      key: "noname",
      render: (noname: any) => (
        <React.Fragment>
          <span className="font-semibold text-gray-800">
            {noname.item.status}
          </span>
          <br />
          {noname.item.status == "Chờ duyệt" ? (
            <button
              onClick={() => onHandleUpdate(noname.item._id)}
              type="button"
              className="focus:outline-none text-red-600 text-sm mt-2 py-1 md:py-2.5 px-2 md:px-5 rounded-md border border-red-600 hover:bg-red-50 flex items-center"
            >
              Huỷ đơn
            </button>
          ) : (
            ""
          )}
          <br />
          {formatDate(noname.item.createdAt)}
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
  ];
  if (!myBill || myBill == undefined) return <>Loadding ...</>;
  const data = myBill.data.map((item: IBill, index: number) => {
    return {
      key: index + 1,
      _id: item._id,
      receiver: {
        name: item.name,
        email: item.email,
        address: item.address,
        tel: item.phone,
        total: item.total,
      },
      products: item.items,
      status: {
        id: item._id,
        name: item.status,
      },
      createdAt: item.createdAt,
      noname: { i: index + 1, item: item },
    };
  });
  async function onHandleUpdate(id: string) {
    message.loading("Vui lòng chờ ....", 10000, () => {});
    try {
      const data = {
        _id: id,
        status: "Huỷ đơn",
      };
      const res = await UpdateBill(data);
      message.destroy();
      await message.success("Huỷ đơn thành công", 2, () => {});
      window.location.reload();
    } catch (error: any) {
      message.destroy();
      await message.error(String(error.response.data.message), 2, () => {});
      window.location.reload();
    }
  }
  return (
    <>
      <section className="w-full">
        <header className="w-full text-center">
          <h1 className="md:text-2xl text-lg uppercase md:my-3 my-2 font-semibold">
            Danh sách đơn hàng
          </h1>
        </header>
        <main>
          {myBill.data.length > 0 ? (
            <Table
              columns={columns}
              dataSource={data}
              bordered
              pagination={{ pageSize: 8, showQuickJumper: true }}
              mobileBreakPoint={768}
            />
          ) : (
            <div className="text-center">Danh sách trống</div>
          )}
        </main>
      </section>
    </>
  );
};

export default MyListBill;
