import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User Found.",
            data: user,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}