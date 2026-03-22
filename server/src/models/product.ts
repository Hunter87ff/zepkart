import { Schema, model } from "mongoose";


const ServiceHighlightSchema = new Schema({
    icon: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    subtext: {
        type: String,
        required: false
    }
}, { _id: false });

const MiscSchema = new Schema({
    refund : {
        type : String,
        required: false
    },
    return : {
        type : String,
        required: false
    },
    warranty : {
        type : String,
        required: false
    },
    cod : {
        type: Boolean,
        required: false,
        default: false
    },
    delivery_fee :{
        type : Number,
        required: false,
        default: 0
    },
    offers: {
        type: [String],
        required: false,
        default: []
    },
    service_highlights: {
        type: [ServiceHighlightSchema],
        required: false,
        default: []
    }
}, { _id : false })



const productSchema = new Schema({
    name: { 
        type : String,
        required: true
    },
    store : {
        type : Schema.Types.ObjectId,
        ref : "Store",
        required: true
    },
    price: {
        type : Number,
        required: [true, "Price is required"],
        min : [0, "Price cannot be negative"]
    },
    discount : {
        type : [Number],
        required: [true, "Discount is required"],
        default: [0, 0], //[percentage, expiry timestamp]
        max : [100, "Discount percentage cannot exceed 100%"],
        min : [0, "Discount percentage cannot be negative"]
    },
    description: {
        type : String,
        required: [true, "Description is required"],
        maxlength : [500, "Description cannot exceed 500 characters"]
    },
    images: {
        type : [String],
        required: [true, "Images are required"]
    },
    rating : {
        type : Number,
        required: [true, "Rating is required"],
        default: 1
    },
    rating_count : {
        type : Number,
        required: [true, "Rating count is required"],
        default: 0
    },
    categories: {
        type : [String],
        required: false
    },
    stock : {
        type : Number,
        required: true,
        default: 1
    },
    misc : {
        type : MiscSchema,
        default: {}
    }
})

const Product = model("Product", productSchema);
export default Product;