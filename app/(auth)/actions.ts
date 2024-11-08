"use server";

import { validateUserFromCookies } from "@/lib/server/authentication";
import { getUser, insertUser, updateUserCity } from "@/lib/server/queries";
import { revalidatePath } from "next/cache";

export async function handleUserLogin() {
    // obtain the users id from his session token
    const userId = await validateUserFromCookies();
    if (!userId) {
        return { success: false, message: "Not authenticated" } as const;
    }
    // check if we can find the user in the database
    const dbUser = getUser(userId);
    if (!dbUser) {
        // if the user was not present, he justed signed up.
        // Create a new database entry for him
        await insertUser(userId);
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
    const userId = await validateUserFromCookies();
    if (!userId) {
        return;
    }
    await updateUserCity(userId, rawFormData.city);
    revalidatePath("");
}
