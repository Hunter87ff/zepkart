import config from "@config";
import mongoose from "mongoose";


async function connectDb() {
    try {
        const _instance = await mongoose.connect(config.mongoURI);
        console.log("MongoDB connected" + _instance.connection.host);
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;