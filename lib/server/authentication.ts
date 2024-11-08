import "server-only";
import { Config, SDK } from "@corbado/node-sdk";
import { cookies } from "next/headers";

// Retrieve environment variables
const projectID = process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID;
const apiSecret = process.env.CORBADO_API_SECRET;

if (!projectID) {
    throw new Error("Project ID is not set");
}
if (!apiSecret) {
    throw new Error("API secret is not set");
}

// Set the default API URLs
const frontendAPI = process.env.CORBADO_FRONTEND_API;
const backendAPI = process.env.CORBADO_BACKEND_API;

if (!frontendAPI) {
    throw new Error("Frontend API URL is not set");
}
if (!backendAPI) {
    throw new Error("Backend API URL is not set");
}

// Initialize the Corbado Node.js SDK with the configuration
const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
const sdk = new SDK(config);

// Validate the user based on a session token
export async function validateUser(sessionToken?: string) {
    if (!sessionToken) {
        return undefined;
    }
    try {
        // Use the SDK to validate the user's session token
        const sessionUser = await sdk.sessions().validateToken(sessionToken);
        // If validation is successful, return the user's ID
        return sessionUser.userId;
    } catch {
        // Return undefined if validation fails
        return undefined;
    }
}

// Validate the user using the session token from cookies
export async function validateUserFromCookies() {
    // Obtain the session token from the request cookies
    const reqCookies = await cookies();
    const sessionToken = reqCookies.get("cbo_session_token")?.value;
    // Validate the user with the obtained session token
    return validateUser(sessionToken);
}

// Retrieve all identifiers for a given user ID
export async function getUserIdentifiers(userId: string) {
    // List user identifiers sorted by creation date in descending order
    return sdk.identifiers().listByUserId(userId);
}
