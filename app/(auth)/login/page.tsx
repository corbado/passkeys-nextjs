import { redirect } from "next/navigation";
import { Login } from "@/app/(auth)/login/client";
import { getAuthenticatedUserFromCookie } from "@/lib/server/authentication";

export default async function LoginPage() {
    const user = await getAuthenticatedUserFromCookie();

    // redirect to the profile, if the user is already authenticated
    if (user) {
        redirect("/profile");
    }

    return <Login />;
}
