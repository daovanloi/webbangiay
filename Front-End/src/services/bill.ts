import IBill, { DIBill } from "../types/bill";
import intansce from "./intansce";

export const GetAllBill = () => {
  return intansce.get("/bill");
};

export const GetOneBill = (id: string) => {
  return intansce.get("/bill/" + id);
};

export const GetBillByUser = (user_id: string) => {
  return intansce.get("/bill/order/" + user_id);
};

export const CreateBill = (data: DIBill) => {
  return intansce.post(`/bill`, data);
};

export const UpdateBill = (data: IBill | { _id: string; status: string }) => {
  return intansce.patch(
    `/bill/${data._id}`,
    { status: data.status },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};

export const RemoveBill = (_id: string) => {
  return intansce.delete(`/bill/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};
