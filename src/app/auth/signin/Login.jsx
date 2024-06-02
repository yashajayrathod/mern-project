// "use client"
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3001/login', { email, password })
//       .then(result => {
//         console.log(result); // Add this line to see the response data
//         if (result.data === 'Success') {
//           console.log('Successfully logged in');
//           router.push('/ecommerce'); // Navigate to the /ecommerce page
//         } else {
//           console.log('Login failed');
//         }
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div className="d-flex justify-content-center align-item-center bg-secondary vh-100 ">
//       <div className="bg-white p-3 rounded w-25">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="eg. yashrathod@trailique.com"
//               autoComplete="off"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control rounded-0"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="password"
//               autoComplete="off"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control rounded-0"
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
//         </form>
//         <p>Create Account</p>
//         <Link href="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">SignUp</Link>
//       </div>
//     </div>
//   );
// }

// export default Login;
