"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success: ", response);
      toast.success("Login Success!")
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-2">
      <h1 className="text-center text-3xl text-white">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />

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
        onClick={onLogin}
        className="p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Login
      </button>
      <Link href="/signup">Signup Page</Link>
    </div>
  );
}
