import { NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/lib/server/authentication";

const secretString = "Passkeys are cool!";

export async function GET(req: NextRequest) {
    // obtain the session token from the request's authorization header
    const sessionToken = req.headers
        .get("authorization")
        ?.replace("Bearer ", "");
    const isAuthenticated = await validateUser(sessionToken);
    if (!isAuthenticated) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }
    // if the user is authenticated, return the secret
    return NextResponse.json({ secret: secretString });
}
