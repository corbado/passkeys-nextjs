import { redirect } from "next/navigation";
import {
    getAuthenticatedUserFromCookie,
    getUserIdentifiers,
} from "@/lib/server/authentication";
import { getUser, insertUser } from "@/lib/server/queries";
import { PasskeyManagement } from "@/app/profile/client";

export default async function Page() {
    const user = await getAuthenticatedUserFromCookie();

    // redirect to the login page, if the user is not authenticated
    if (!user) {
        redirect("/login");
    }

    let dbUser = getUser(user.userId);

    // if we delete the example database, we might go out of sync with
    // the corbado database, so we need to recreate the user again
    dbUser ??= await insertUser(user.userId);

    const userIdentifiers = await getUserIdentifiers(user.userId);

    return (
        <div>
            <h1>Profile</h1>
            <p>
                <strong>Example userID</strong>: {dbUser.id}
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
