"use client"
import axios from "axios";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        const res = await axios.get('/api/user/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    const onlogout = async () => {
      try {
        setLoading(true);
        await axios.get("/api/users/logout");
        toast.success("Logout Success!");
        router.push("/login");
      } catch (error: any) {
        console.log("Logout Failed: ", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="flex flex-col items-center py-2 min-h-screen justify-center">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="bg-green-500 p-4 rounded">
                {data === 'nothing' ? "Nothing" :
                <Link href={`/profile/${data}`}>{data}</Link> }
             </h2>
            <button
            className="bg-blue-500 mt-4 hover:bg-blue-800 text-white font-bold py-2 rounded"
            onClick={onlogout}
            >
                Logout
            </button>

            <button
            className="bg-green-600 mt-4 hover:bg-green-800 text-white font-bold py-2 rounded"
            onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    );
}