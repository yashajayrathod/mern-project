// import ECommerce from "@/components/Dashboard/E-commerce";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import SignIn from "./auth/signin/page";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import {redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
export const metadata ={
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <>
   
      <LoginForm/>
      
    </>
  );
}
