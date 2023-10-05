import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("몽고디비에 접속했습니다.")
    } catch(error){
        console.log("몽고디비에 접속할때 에러가 발생했습니다.", error);
    }
};