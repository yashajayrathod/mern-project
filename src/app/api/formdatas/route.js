import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Client from "@/models/demo";

export async function POST(req) {
    try {
        const { name, phoneNumber, email, company, expiryDate, generatePassword } = await req.json();

        if (!name || !phoneNumber || !email || !company || !expiryDate || !generatePassword) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        // Hash the generated password
        const hashedPassword = await bcrypt.hash(generatePassword, 10);

        // Connect to MongoDB
        await connectMongoDB();

        // Create the new client record
        await Client.create({
            name,
            email,
            phoneNumber,
            company,
            expiryDate,
            generatePassword: hashedPassword
        });

        // Return a success response
        return NextResponse.json({ message: "Client registered successfully." }, { status: 201 });

    } catch (error) {
        console.error("Error during client registration:", error);
        return NextResponse.json(
            { message: "An error occurred while registering the client." },
            { status: 500 }
        );
    }
}
