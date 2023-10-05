import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req){
    try{
        
        const {name, email, password} = await req.json();
        const hashedPaswword=await bcrypt.hash(password, 10);

        // console.log("Name: ", name); 
        // console.log("Email: ", email)
        // console.log("Password: ", password)
        
        await connectMongoDB();
        await User.create({name, email, password:hashedPaswword})

        return NextResponse.json(
            {message: "사용자가 등록되었습니다."}, {status: 201}
        )
    } catch (error){
        return NextResponse.json(
            {message: "사용자 등록할때 에러가 발생했습니다."}, {status: 500}
        )
    }
}  