import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import IBill from "../../../types/bill";
import { GetOneBill } from "../../../services/bill";
const BillSuccess = () => {
  const [bill, setBill] = useState<IBill | undefined>(undefined);
  const { id }: string | any = useParams();
  useEffect(() => {
    GetOneBill(id).then(({ data }: any) => setBill(data));
  }, []);
  if (bill && bill == undefined) return null;
  return (
    <div>
      <div className="flex flex-col justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg boder-black">
          <h1 className="text-2xl font-bold mb-10  text-center">
            Đặt hàng thành công
          </h1>
          <div className="flex flex-col mb-4 grid grid-cols-4 ">
            <div>
              <h2 className="text-lg font-bold mb-2">Thông tin khách hàng</h2>
              <div className="flex flex-col space-y-2" key={bill?._id}>
                <div>
                  <span className="font-bold">Họ tên:</span>
                  {bill?.name}
                </div>
                <div>
                  <span className="font-bold">Địa chỉ:</span>
                  {bill?.address}
                </div>
                <div>
                  <span className="font-bold">Số điện thoại:</span>
                  {bill?.phone}
                </div>
                <div>
                  <span className="font-bold">Email:</span>
                  {bill?.email}
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-4 col-span-3">
              <h2 className="text-lg font-bold mb-2">Thông tin đơn hàng</h2>
              <table className="table-auto w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-2 font-bold text-left">Sản phẩm</th>
                    <th className="px-3 py-2 font-bold text-left">Hình ảnh</th>
                    <th className="px-3 py-2 font-bold text-left">
                      Kích thước
                    </th>
                    <th className="px-3 py-2 font-bold text-right">Giá</th>
                    <th className="px-3 py-2 font-bold text-right">Số lượng</th>
                    <th className="px-3 py-2 font-bold text-right">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bill?.items.map((item: any) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-300 hover:bg-gray-200"
                    >
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2 w-1/4">
                        <img src={item.image} alt="" />
                      </td>
                      <td className="px-3 py-2">{item.size}</td>
                      <td className="px-3 py-2 text-right">
                        {item.price.toLocaleString()}đ
                      </td>
                      <td className="px-3 py-2 text-right">{item.quantity}</td>
                      <td className="px-3 py-2 text-right">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="px-3 py-2 font-bold text-right">
                      Tổng cộng:
                    </td>
                    <td className="px-3 py-2 font-bold text-right">
                      {bill?.total.toLocaleString()}đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-gray-700">
            Cảm ơn bạn đã mua hàng của chúng tôi. Đơn hàng của bạn đã được ghi
            nhận và sẽ được xử lý trong thời gian sớm nhất.
          </p>
        </div>
      </div>
    </div>
  );
};
export default BillSuccess;
