import { validateUserFromCookies } from "@/lib/server/authentication";
import Link from "next/link";
import LoggedInClosedPage from "@/app/closed/client";

export default async function Closed() {
    // the userId being present means the user is authenticated
    const userId = await validateUserFromCookies();

    if (!userId) {
        return (
            <div>
                <h1>Closed!</h1>
                <p>This page is for logged in users only. Please login:</p>
                <Link href="/login" className="button">
                    Login
                </Link>
            </div>
        );
    }

    return <LoggedInClosedPage />;
}
