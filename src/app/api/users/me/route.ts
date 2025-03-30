import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        if (!userId) {
          return NextResponse.json(
            { error: "Invalid or missing token." },
            { status: 401 }
          );
        }

        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User Found.",
            data: user,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}