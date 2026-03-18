import {Schema, model} from "mongoose";


const wishlistSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    products : [{
        type : Schema.Types.ObjectId,
        ref : "Product"
    }]
})

const Wishlist = model("Wishlist", wishlistSchema);

export default Wishlist;