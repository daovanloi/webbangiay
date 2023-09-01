import React, { useEffect, useState } from 'react';
import { GetAllUser } from '../../services/user';
import { GetAllBill } from '../../services/bill';
import IBill from '../../types/bill';
import TopProducts from '../../components/admin/TopProducts';
import { formatMoney } from '../../utils/MoneyUtils';

const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState<number>();
  useEffect(() => {
    GetAllUser().then((response) => {
      const users = response.data;
      const countuser = users.length;
      setTotalMembers(countuser);
    })
      .catch((error) => console.log(error));
  }, []);

  const [bills, setBills] = useState<IBill[]>([]);
  useEffect(() => {
    GetAllBill()
      .then((response) => {
        const bills = response.data;
        setBills(bills);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculateTotal = (bills: IBill[]) => {
    const total = bills.reduce((acc, bill) => acc + bill.total, 0);
    return total;
  };

 

  return (
    <div>
      <div className="flex gap-3">
        <div className="bg-gray-100 p-4 rounded-md shadow-md  sm:w-full md:w-1/3">
          <div className="font-bold text-lg mb-2">Số lượng thành viên</div>
          <div className="font-bold text-3xl">{totalMembers}</div>
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3">
          <div className="font-bold text-lg mb-2">Tổng số đơn hàng</div>
          <div className="font-bold text-3xl">{bills.length}</div>
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3">
          <div className="font-bold text-lg mb-2">Tổng giá trị đơn hàng</div>
          <div className="font-bold text-3xl text-red-700">{formatMoney(calculateTotal(bills))}</div>
        </div>
      </div>
      <div className="mt-10">
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
      
      <TopProducts />
    </div>
  );
};

export default Dashboard;