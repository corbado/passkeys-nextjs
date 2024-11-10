import { redirect } from "next/navigation";
import {
    getAuthenticatedUserFromCookie,
    getUserIdentifiers,
} from "@/lib/server/authentication";
import { getUser } from "@/lib/server/queries";
import { PasskeyManagement } from "@/app/profile/client";

export default async function Page() {
    const user = await getAuthenticatedUserFromCookie();

    // redirect to the login page, if the user is not authenticated
    if (!user) {
        redirect("/login");
    }

    const dbUser = getUser(user.userId);

    if (!dbUser) {
        // this case should never occur, but needs to be handled still
        redirect("/login");
    }

    const userIdentifiers = await getUserIdentifiers(user.userId);

    return (
        <div>
            <h1>Profile</h1>
            <p>
                <strong>Example userId</strong>: {dbUser.id}
            </p>
            <p>
                <strong>Corbado userID</strong>: {dbUser.corbado_user_id}
            </p>
            <h2>Your Identifiers</h2>
            <div id="identifier-list">
                {userIdentifiers.identifiers.map((identifier) => (
                    <div key={identifier.value}>
                        <p>
                            <strong>Type</strong>: {identifier.type}
                        </p>
                        <p>
                            <strong>Value</strong>: {identifier.value}
                        </p>
                    </div>
                ))}
            </div>
            <PasskeyManagement />
        </div>
    );
}
