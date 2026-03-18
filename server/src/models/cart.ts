import { Schema, model } from "mongoose";



const cartItemSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        validator: function (value: number) {
            return value > 0;
        }
    },
    price_at_addition: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    total_price: {
        type: Number,
        required: true
    }
})


const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Cart = model("Cart", cartSchema);
const CartItem = model("CartItem", cartItemSchema);

export { Cart, CartItem }