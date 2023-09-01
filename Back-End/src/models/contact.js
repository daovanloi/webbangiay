import mongoose from "mongoose";
const ContactModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    tel: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: false,
    },
    message: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Contact", ContactModel);
