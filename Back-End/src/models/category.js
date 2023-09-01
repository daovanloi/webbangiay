import mongoose from "mongoose";
const CategoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CategoryModel.pre("findOneAndDelete", async function (next) {
  try {
    // Lấy model Product từ biến đã import
    const Product = mongoose.model("Product");
    //  lấy điều kiện tìm kiếm hiện tại của câu lệnh, xác định category mà đang được xóa trong trường hợp này.
    const filter = this.getFilter();
    //kiểm tra xem câu lệnh truy vấn có chứa trường categoryId được cập nhật không, nếu có lấy giá trị của trường đó để cập nhật cho các sản phẩm có cùng categoryId.
    const categoryId = this.getQuery().$set?.categoryId;
    console.log(categoryId);

    Product.updateMany(
      { "CategoryId._id": categoryId },
      { $set: { "CategoryId._id": "64a0e5b72d0596968fdcf0a4" } }
    );
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Category", CategoryModel);
