import Comment from "../models/comment.js";

export const getAllComment = async (req, res) => {
  try {
    const comment = await Comment.find();
    if (comment.length === 0) {
      return res.status(404).json({
        message: "Không có bình luận nào",
      });
    }
    return res.status(200).json({
      message: "thành công",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const AdGetAllComment = async (req, res) => {
  try {
    const comment = await Comment.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "User_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "Product_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $unwind: "$product"
      },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          Product_id: 1,
          User_id: 1,
          "user.name": 1,
          "product.name": 1
        }
      }
    ])
    if (comment.length === 0) {
      return res.status(404).json({
        message: "Không có bình luận nào",
      });
    }
    return res.status(200).json({
      message: "thành công",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneComment = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        message: "Không tìm thấy bình luận",
      });
    }
    return res.status(200).json({
      message: "thành công",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getCommentByProducts = async function (req, res) {
  try {
    const comment = await Comment.find({ Product_id: req.params.Product_id });
    if (comment.length === 0) {
      return res.status(404).json({
        message: "chưa có bình luận nào",
      });
    }
    return res.status(200).json({
      message: "thành công",
      data: comment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
export const createComment = async function (req, res) {
  try {
    const comment = await Comment.create(req.body);
    if (!comment) {
      return res.status(404).json({
        message: "Không thể thêm bình luận",
      });
    }
    return res.status(200).json({
      message: "Thêm bình luận thành công",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateComment = async function (req, res) {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(404).json({
        message: "Cập nhật bình luận không thành công",
      });
    }
    return res.status(200).json({
      message: "Cập nhật bình luận thành công",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const removeComment = async function (req, res) {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Xóa bình luận thành công",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
