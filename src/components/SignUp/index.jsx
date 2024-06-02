// "use client"
// import Link from "next/link"
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignUpForm(){
//   const [name,setName] = useState("");
//   const[email,setEmail]=useState("");
//   const[password,setPassword]=useState("");
//   const[error,setError] = useState("");

//   const router = useRouter();

//   // console.log("Name:"+name);
//   // console.log("Email"+email);
//   // console.log("Password:",password)

//   const handleSubmit = async(e) =>{
//     e.preventDefault();



//     if(!name || !email || !password){
//       setError("All fields are necessary. ");
//       return;
//     }
//     try {
//       const resUserExists = await fetch("api/userExists", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const { user } = await resUserExists.json();

//       if (user) {
//         setError("User already exists.");
//         return;
//       }

//       const res=await fetch("api/register",{
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json"
//         },
//         body:JSON.stringify({
//           name,email,password
//         })
//       })
//       if(res.ok){
//         const form =e.target;
//         form.reset();
//         router.push("/")

//       }else{
//         console.log("user registration",error);
//       }
      

//     }catch(error){
//       console.log("Error during registration:",error);

//     }
//   };
//     return(
//         <div className="grid place-items-center h-screen">
//         <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
//           <h1 className="text-xl font-bold my-4">SignUp</h1>
  
//           <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//           <input
//               onChange={(e) => setName(e.target.value)}
//               type="text"
//               placeholder="Name"
//             />
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               type="text"
//               placeholder="Email"
//             />
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Password"
//             />
//             <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
//               SignUp
//             </button>
//             {error && (
//               <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
//                 {error}
//               </div>
//             )}

//             <Link className="text-sm mt-3 text-right" href={"/"}>
//               Already have an account? <span className="underline">SignIn</span>
//             </Link>
//           </form>
//         </div>
//       </div>
//     )
// }




"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    const emailRegex = /\S+@trailique\.com$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid Trailique email address.");
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (name.length < 3 || !nameRegex.test(name)) {
      setError("Name must be at least 3 characters long and contain only letters.");
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (password.length < 6 || !passwordRegex.test(password)) {
      setError("Password must be at least 6 characters long and include at least one number and one special character.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        setError("User registration failed.");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error during registration:", error);
      setError("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">SignUp</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            aria-label="Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            aria-label="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            aria-label="Password"
          />
          <button
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "SignUp"}
          </button>
          {error && (
            <div className="bg-red text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">SignIn</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
