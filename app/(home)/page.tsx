import { validateUserFromCookies } from "@/lib/server/authentication";
import { getUser } from "@/lib/server/queries";
import { HomePage } from "@/app/(home)/client";

export default async function Home() {
    const userId = await validateUserFromCookies();
    const dbUser = userId ? getUser(userId) : undefined;

    return <HomePage city={dbUser?.city || "unknown"} />;
}
