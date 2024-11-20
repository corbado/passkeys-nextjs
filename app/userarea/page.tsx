import Link from "next/link";
import LoggedInUserArea from "@/app/userarea/client";
import { getAuthenticatedUserFromCookie } from "@/lib/server/authentication";

export default async function UserArea() {
    // the userId being present means the user is authenticated
    const user = await getAuthenticatedUserFromCookie();

    if (!user) {
        return (
            <div>
                <h1>User area!</h1>
                <p>This page is for logged in users only. Please login:</p>
                <Link href="/login" className="button">
                    Login
                </Link>
            </div>
        );
    }

    return <LoggedInUserArea />;
}
