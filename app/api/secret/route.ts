import { NextRequest, NextResponse } from "next/server";
import {
    getAuthenticatedUserFromAuthorizationHeader,
    getAuthenticatedUserFromCookie,
} from "@/lib/server/authentication";

const secretString = "Passkeys are cool!";

export async function GET(req: NextRequest) {
    // obtain the session token from the request's cookie or authorization header
    let user = await getAuthenticatedUserFromCookie();
    user ??= await getAuthenticatedUserFromAuthorizationHeader(req);

    if (!user) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }
    // if the user is authenticated, return the secret
    return NextResponse.json({ secret: secretString });
}

