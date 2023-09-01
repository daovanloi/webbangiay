import Bill from "../models/bill.js";
import BillSchema from "../validates/bill.js";
import Product from "../models/product.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const { MAIL_USERNAME } = process.env;
const { MAIL_PASSWORD } = process.env;
const { MAIL_FROM_ADDRESS } = process.env;

export const getAllBill = async (req, res) => {
  try {
    const bill = await Bill.find();
    if (bill.length === 0) {
      return res.status(404).json({
        message: "Không có đơn hàng nào",
      });
    }
    return res.status(200).json({
      message: "thành công",
      data: bill,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getOneBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng nào",
      });
    }
    return res.status(200).json({
      message: "thành công",
      data: bill,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getBillByUser = async function (req, res) {
  try {
    const bill = await Bill.find({ User_id: req.params.User_id });
    if (bill.length === 0) {
      return res.status(404).json({
        message: "bạn chưa có đơn hàng nào",
      });
    }
    return res.status(200).json({
      message: "thành công",
      data: bill,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
export const createBill = async function (req, res) {
  try {
    const { error } = BillSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(404).json({
        message: errors,
      });
    }
    const listItems = req.body.items;
    if (!listItems | (listItems.length === 0)) {
      return res.status(404).json({
        message: "Giỏ hàng rỗng",
      });
    }
    const newArrSizes = [];

    for (const item of listItems) {
      try {
        const product = await Product.findById(item._id);
        if (!product.sizes && product.sizes.length == 0)
          return res.status(404).json({
            nameProduct: product.name,
            message: "Sản phẩm không còn size",
          });
        // console.log("Product size core ", product.sizes);
        for (const iSize of product.sizes) {
          if (iSize.size !== item.size) {
          } else {
            const ProQuantity = iSize.quantity - item.quantity;
            if (ProQuantity < 0) {
              return res.status(404).json({
                product: product.name,
                message: `Số lượng ${item.size} sản phẩm ${
                  iSize.quantity > 0
                    ? "chỉ còn " + iSize.quantity
                    : "hiện đã hết"
                }`,
              });
            }
            // console.log("Tên sản phẩm", product.name);
            const dataPush = {
              size: iSize.size,
              quantity: ProQuantity,
              _id: iSize._id,
            };
            // console.log("Size cũ của sản phẩm", product.sizes);
            const nice = product.sizes.map((item2) => {
              if (item2.size !== item.size) {
                return item2;
              } else {
                return {
                  size: item.size,
                  quantity: ProQuantity,
                  _id: iSize._id,
                };
              }
            });
            product.sizes = nice;
            const ress = await product.save();
            if (!ress) {
              return res.status(400).json({
                message: "Cập nhật size sản phẩm thất bại",
                product: ress,
              });
            }
            // console.log("Size cần thay đổi", dataPush);
            newArrSizes.push(dataPush);
          }
        }
        // console.log(newArrSizes);
      } catch (error) {
        return res.status(400).json({
          message: "Cập nhật size sản phẩm thất bại",
          error,
        });
      }
    }
    const dataPushBill = req.body;
    dataPushBill.orderCode =
      Math.random().toString(35).substring(4, 8).toUpperCase() + Date.now();
    const bill = await Bill.create(dataPushBill);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: MAIL_FROM_ADDRESS,
      to: req.body.email,
      subject: "Cảm ơn bạn đã mua hàng",
      html: `
            <div style="background-color: #f5f5f5; padding: 20px;">
                <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);">
                <h1 style="text-align: center; margin-bottom: 0;">Cảm ơn bạn đã mua hàng</h1>
                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
                <p>Xin chào <strong>${req.body.name}</strong>,</p>
                <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xác nhận và sẽ được vận chuyển trong thời gian sớm nhất.</p>
                <p>Thông tin đơn hàng:</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${listItems
                      .map(
                        (item) => `
                    <li style="margin-bottom: 20px; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                        <img src="${
                          item.image
                        }" alt="" style="max-width: 100%; height: auto;"/>
                        <h3 style="margin-top: 0;">${item.name}</h3>
                        <p style="margin-bottom: 5px;">Size: ${item.size}</p>
                        <p style="margin-bottom: 5px;">Số lượng: ${
                          item.quantity
                        }</p>
                        <p style="margin-bottom: 0;">Đơn giá: ${
                          item.price * item.quantity
                        }</p>
                    </li>
                `
                      )
                      .join("")}
            </ul>
            <p>Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của chúng tôi.</p>
            <p>Trân trọng,</p>
            <p>Đội ngũ của chúng tôi</p>
        </div>
    </div>
`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Tạo đơn hàng thành công",
      data: bill,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateBill = async function (req, res) {
  try {
    if (req.user.role == "member") {
      const bill1 = await Bill.findById(req.params.id);
      // console.log(bill1.User_id);
      // console.log(req.user._id);
      // if (String(bill1.User_id) == String(req.user._id)) console.log("Bằng");
      // return;
      if (String(bill1.User_id) !== String(req.user._id))
        return res.status(400).json({
          message: "Bạn không đủ quyền",
        });
      const bill2 = await Bill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!bill2) {
        return res.status(404).json({
          message: "Cập nhật đơn hàng từ người dùng không thành công",
        });
      }
      return res.status(200).json({
        message: "Cập nhật đơn hàng từ người dùng thành công",
        data: bill2,
      });
    }
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bill) {
      return res.status(404).json({
        message: "Cập nhật đơn hàng không thành công",
      });
    }
    return res.status(200).json({
      message: "Cập nhật đơn hàng thành công",
      data: bill,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeBill = async function (req, res) {
  try {
    const bill = await Bill.findOneAndDelete({
      _id: req.params.id,
      status: "đang chờ duyệt",
    });
    if (bill) {
      return res.status(200).json({
        message: "hủy đơn hàng thành công",
        bill,
      });
    } else {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng hoặc đơn hàng đã được duyệt",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
