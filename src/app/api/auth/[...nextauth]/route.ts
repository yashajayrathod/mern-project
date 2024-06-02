// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs"

// export const authOptions = {
//     providers: [
        
//         CredentialsProvider({
//           name: "credentials",
//           credentials: {},


//             async authorize(credentials){
//                const{ email,password} = credentials;

//                try{
//                 await connectMongoDB();
//                 const user=await User.findOne({email});
//                 if (!user){
//                     return null;
//                 }
//                 const passwordsMatch = await bcrypt.compare(password,user.password);

//                 if (!passwordsMatch){
//                     return null;
//                 }
//                 return user;

//                }catch(error){

//                 console.log("Error",error);

//                }
               
//             },
//         }),
//     ],
//     session:{
//         strategy:"jwt",
//     },
//     secret:process.env.NEXTAUTH_SECRET,
//     pages:{
//         signIn:"/",
       
//     },
   
// };
// const handler = NextAuth(authOptions);

// export { handler as GET,handler as POST};


// import { connectMongoDB } from "@/lib/mongodb";
// import User from "@/models/user";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {},
//             async authorize(credentials) {
//                 const { email, password } = credentials;

//                 try {
//                     await connectMongoDB();
//                     const user = await User.findOne({ email });
//                     if (!user) {
//                         console.log("No user found with the email");
//                         return null;
//                     }
//                     const passwordsMatch = await bcrypt.compare(password, user.password);
//                     if (!passwordsMatch) {
//                         console.log("Passwords do not match");
//                         return null;
//                     }
//                     return user;
//                 } catch (error) {
//                     console.error("Error during authorization", error);
//                     throw new Error("Authorization failed");
//                 }
//             },
//         }),
//     ],
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/", // Redirect to the sign-in page
//     },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        console.log("No user found with the email");
                        return null;
                    }
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        console.log("Passwords do not match");
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.error("Error during authorization", error);
                    throw new Error("Authorization failed");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/", // Redirect to the sign-in page
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
