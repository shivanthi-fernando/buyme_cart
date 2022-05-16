const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        products: [
            {
                productId: {type: String, required: true},
                title: {type: String, required: true, unique: true},
                desc: {type: String, required:true},
                img: {type: String, required: true},
                categories: {type: Array},
                size: {type: String},
                color: {type: String},
                price: {type: Number, required: true},
                quantity: {type: Number, default: 1},
            },
        ],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema);