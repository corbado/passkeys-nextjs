import { Profile } from "@/app/profile/client";
import { redirect } from "next/navigation";
import {
    getUserIdentifiers,
    validateUserFromCookies,
} from "@/lib/server/authentication";
import { getUser } from "@/lib/server/queries";

export default async function Page() {
    const user = await validateUserFromCookies();

    // redirect to the login page, if the user is not authenticated
    if (!user) {
        redirect("/login");
    }

    const dbUser = getUser(user);

    if (!dbUser) {
        // this case should never occur, but needs to be handled still
        redirect("/login");
    }

    const userIdentifiers = await getUserIdentifiers(user);

    return (
        <Profile dbUser={dbUser} identifiers={userIdentifiers.identifiers} />
    );
}
