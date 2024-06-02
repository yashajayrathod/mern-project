import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function POST(req){
    try{
        const{name,email,password}=await req.json();
        // console.log("name",name);
        // console.log("email",email);
        // console.log("password",password);
        const hashedPassword = await bcrypt.hash(password,10);

        await connectMongoDB();
        await User.create({name,email,password:hashedPassword });

        return NextResponse.json({message:"User Resgister."},{status:201});

    }catch(errror){
        return NextResponse.json(
            {
                message:"An error occorred while registering the user."
            },{status:500}
        );

    }
       
    
}