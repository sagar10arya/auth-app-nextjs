"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
     })

     const [buttonDisabled, setButtonDisabled] = useState(false);
     const [loading, setLoading] = useState(false);

     const onSignup = async () => {
        try {
          setLoading(true)
          const response = await axios.post('/api/users/signup', user)
          console.log("SignUp Success: ", response);
          router.push('/login');
          
        } catch (error: any) {
            console.log("Signup Failed: ",error.message)
            toast.error(error.message)
        } finally {
          setLoading(false)
        }
     }

     useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
      {
        setButtonDisabled(false);
      } else{
        setButtonDisabled(true);
      }
     }, [user])

    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-2">
        <h1 className="text-center text-3xl text-white">
          {loading ? "Processing" : "SignUp"}
        </h1>
        <hr />
        <label className="inline-block mb-1 p-2" htmlFor="username">
          username
        </label>
        <input
          className="px-3 py-3 rounded-lg bg-white 
                text-black outline-none focus:bg-gray-50 duration-200 
                border border-gray-200 "
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />

        <label className="inline-block mb-1 p-2" htmlFor="email">
          email
        </label>
        <input
          className="px-3 py-3 rounded-lg bg-white 
                text-black outline-none focus:bg-gray-50 duration-200 
                border border-gray-200 "
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label className="inline-block mb-1 p-2" htmlFor="password">
          password
        </label>
        <input
          className="px-3 py-3 rounded-lg bg-white 
                text-black outline-none focus:bg-gray-50 duration-200 
                border border-gray-200 "
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <button 
        className="p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignup}
        >
          {buttonDisabled ? "No SignUp" : "SignUp"}
        </button>
        <Link href='/login'>Login Page</Link>
      </div>
    );
}