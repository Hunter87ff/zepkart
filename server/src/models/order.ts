import {Schema, model} from "mongoose";



const OrderItemSchema = new Schema({
    order : {
        type : Schema.Types.ObjectId,
        ref : "Order",
        required : true
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        min : [1, "Quantity must be at least 1"]
    },
    price_at_purchase : {
        type : Number,
        required : true,
        min : [0, "Price cannot be negative"]
    }
})



const OrderSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    amount : {
        type : Number,
        required : true,
        min : [0, "Amount cannot be negative"]
    },
    discount : {
        type : Number,
        required : true,
        min : [0, "Discount cannot be negative"],
        max : [100, "Discount percentage cannot exceed 100%"]
    },
    /**@property after tax, discount */
    total_amount : {
        type : Number,
        required : true,
        min : [0, "Total amount cannot be negative"]
    },
    status : {
        type : String,
        required : true,
        enum : ["pending", "shipped", "delivered", "cancelled"],
        default : "pending"
    }
})

const Order = model("Order", OrderSchema);
const OrderItem = model("OrderItem", OrderItemSchema);

export {Order, OrderItem};