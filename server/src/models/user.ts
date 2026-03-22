import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        maxlength : [100, "Name cannot exceed 100 characters"],
        minlength : [2, "Name must be at least 2 characters"]
    },
    avatar : {
        type : String,
        default : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    },
    phone : {
        type : String,
        required : [true, "Phone number is required"],
        unique : true,
        match : [/^\d{10}$/, "Please provide a valid 10-digit phone number"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        match : [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [6, "Password must be at least 6 characters"] // hashed
    },
    permissions : {
        type : [Number],
        default : [333] // PermissionLevels.user
    },
    address: {
        address_line: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        pincode: { type: String, default: "" }
    }
})

export const User = model("User", userSchema);

export default User;

