interface IContact {
  _id: string;
  key: string;
  name: string;
  email: string;
  tel: number;
  address: string;
  message: string;
  role: "admin" | "member";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export default IContact;
