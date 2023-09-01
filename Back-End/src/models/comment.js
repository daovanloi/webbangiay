import mongoose from "mongoose";
const CommentModel = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    User_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    Product_id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        require: true
    }
}, {
    timestamps: true,
    versionKey: false,
})

export default mongoose.model("Comment", CommentModel)