import { redirect } from "next/navigation";
import { Signup } from "@/app/(auth)/signup/client";
import { getAuthenticatedUserFromCookie } from "@/lib/server/authentication";

export default async function SignupPage() {
    const user = await getAuthenticatedUserFromCookie();

    // redirect to the profile, if the user is already authenticated
    if (user) {
        redirect("/profile");
    }

    return <Signup />;
}