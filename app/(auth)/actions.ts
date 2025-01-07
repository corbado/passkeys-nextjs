"use server";

import { getUser, insertUser, updateUserCity } from "@/lib/server/queries";
import { revalidatePath } from "next/cache";
import { getAuthenticatedUserFromCookie } from "@/lib/server/authentication";

export async function handleUserLogin() {
    // obtain the users id from his session token
    const user = await getAuthenticatedUserFromCookie();
    if (!user) {
        return { success: false, message: "Not authenticated" } as const;
    }
    // check if we can find the user in the database
    const dbUser = getUser(user.userId);
    if (!dbUser) {
        // if the user was not present, he just signed up.
        // Create a new database entry for him
        await insertUser(user.userId);
    }
    return {
        success: true,
        // if the user exists in the database and has a city value,
        // he has completed the onboarding
        hasCompletedOnboarding: !!dbUser && !!dbUser.city,
    } as const;
}


export async function updateCity(data: FormData) {
    const rawFormData = {
        city: data.get("city"),
    };
    if (!rawFormData.city || typeof rawFormData.city !== "string") {
        return;
    }
    // obtain the current users id through his session-token cookie
    const user = await getAuthenticatedUserFromCookie();
    if (!user) {
        return;
    }
    await updateUserCity(user.userId, rawFormData.city);
    revalidatePath("/");
}
