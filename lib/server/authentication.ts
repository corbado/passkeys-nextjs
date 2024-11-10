import "server-only";
import { Config, SDK } from "@corbado/node-sdk";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Retrieve environment variables
const projectID = process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID;
const apiSecret = process.env.CORBADO_API_SECRET;
if (!projectID) {
    throw Error("Project ID is not set");
}
if (!apiSecret) {
    throw Error("API secret is not set");
}

// Set the default API URLs
const frontendAPI = process.env.CORBADO_FRONTEND_API;
const backendAPI = process.env.CORBADO_BACKEND_API;
if (!frontendAPI) {
    throw Error("Frontend API URL is not set");
}
if (!backendAPI) {
    throw Error("Backend API URL is not set");
}

// Initialize the Corbado Node.js SDK with the configuration
const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
const sdk = new SDK(config);

export async function getAuthenticatedUserFromCookie() {
    const reqCookies = await cookies();
    const sessionToken = reqCookies.get("cbo_session_token")?.value;
    if (!sessionToken) {
        return null;
    }
    try {
        return await sdk.sessions().validateToken(sessionToken);
    } catch {
        return null;
    }
}

export async function getAuthenticatedUserFromAuthorizationHeader(
    req: NextRequest,
) {
    const sessionToken = req.headers
        .get("Authorization")
        ?.replace("Bearer ", "");
    if (!sessionToken) {
        return null;
    }
    try {
        return await sdk.sessions().validateToken(sessionToken);
    } catch {
        return null;
    }
}


// Retrieve all identifiers for a given user ID
export async function getUserIdentifiers(userId: string) {
    // List user identifiers sorted by creation date in descending order
    return sdk.identifiers().listByUserId(userId);
}
