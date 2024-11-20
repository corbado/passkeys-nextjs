export const dynamic = "force-dynamic";

import { getUser } from "@/lib/server/queries";
import { HomePage } from "@/app/(home)/client";
import { getAuthenticatedUserFromCookie } from "@/lib/server/authentication";

export default async function Home() {
    const user = await getAuthenticatedUserFromCookie();
    const dbUser = user ? getUser(user.userId) : undefined;

    return <HomePage city={dbUser?.city || "unknown"} />;
}
