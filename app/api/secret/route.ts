import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUserFromAuthorizationHeader } from "@/lib/server/authentication";

const secretString = "Passkeys are cool!";

export async function GET(req: NextRequest) {
    // obtain the session token from the request's authorization header
    const user = await getAuthenticatedUserFromAuthorizationHeader(req);
    const isAuthenticated = !!user;
    if (!isAuthenticated) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }
    // if the user is authenticated, return the secret
    return NextResponse.json({ secret: secretString });
}