import { validateUserFromCookies } from "@/lib/server/authentication";
import { redirect } from "next/navigation";
import { Login } from "@/app/(auth)/login/client";

export default async function LoginPage() {
    const userId = await validateUserFromCookies();

    // redirect to the profile, if the user is already authenticated
    if (userId) {
        redirect("/profile");
    }

    return <Login />;
}
