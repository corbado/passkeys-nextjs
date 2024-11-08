import { validateUserFromCookies } from "@/lib/server/authentication";
import { redirect } from "next/navigation";
import { Signup } from "@/app/(auth)/signup/client";

export default async function SignupPage() {
    const userId = await validateUserFromCookies();

    // redirect to the profile, if the user is already authenticated
    if (userId) {
        redirect("/profile");
    }

    return <Signup />;
}
