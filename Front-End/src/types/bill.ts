import { ICartItem } from "./cart";

interface IBill {
  _id: string;
  key: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  items: Itembill[];
  total: number;
  status: string;
  orderCode: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export interface DIBill {
  _id?: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  items: ICartItem[];
  total: number;
  User_id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export interface Itembill {
  [x: string]: any;
  _id: string;
  image: string;
  name: string;
  price: number;
  size: number;
  quantity: number;
}
export default IBill;

export interface IBillState {
  BillItems: IBill[];
}
