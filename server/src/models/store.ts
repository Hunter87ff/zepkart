import { Schema, model } from 'mongoose';




const PoliciesSchema = new Schema({
    shipping: {
        type: String,
        required: false
    },
    return: {
        type: String,
        required: false
    },
    refund: {
        type: String,
        required: false
    },
    warranty: {
        type: String,
        required: false
    }
}, { _id : false })

const storeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Store name is required"],
        maxlength: [100, "Store name cannot exceed 100 characters"],
        minlength: [2, "Store name must be at least 2 characters"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    logo: {
        type: String,
        required: [false, "Logo URL is required"],
        // match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, "Please provide a valid image URL"]
    },
    banner: {
        type: String,
        required: [false, "Banner URL is required"],
        // match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, "Please provide a valid image URL"]
    },
    contact_email: {
        type: String,
        required: [true, "Contact email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    contact_phone: {
        type: String,
        required: [true, "Contact phone number is required"],
        match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"]
    },
    verified: {
        type: Boolean,
        required: false,
        default: false
    },
    rating: {
        type: Number,
        required: false,
        default: 1,
        min: [1, "Rating cannot be less than 1"],
        max: [5, "Rating cannot be greater than 5"]
    },
    policies: PoliciesSchema
})

export const Store = model("Store", storeSchema);

export default Store;