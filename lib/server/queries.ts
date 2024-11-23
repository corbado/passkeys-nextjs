// userModel.ts
import db, { User } from "@/lib/server/db";

/**
 * Retrieves a user by their corbado_user_id.
 * @param corbado_user_id - The unique corbado_user_id of the user.
 * @returns The user object or undefined if not found.
 */
export function getUser(corbado_user_id?: string): User | undefined {
    return db.data.users.find(
        (user) => user.corbado_user_id === corbado_user_id,
    );
}

/**
 * Inserts a new user into the database.
 * @param corbado_user_id - The unique corbado_user_id of the user.
 * @returns The newly created user object.
 */
export async function insertUser(corbado_user_id: string) {
    // check if user already exists
    if (getUser(corbado_user_id)) {
        throw new Error("User already exists");
    }
    const user = {
        id: crypto.randomUUID(),
        corbado_user_id,
        city: null,
    };
    await db.update(({ users }) => users.push(user));
    return user;
}

/**
 * Updates the city of a user identified by corbado_user_id.
 * @param corbado_user_id - The unique corbado_user_id of the user.
 * @param city - The new city to set.
 */
export async function updateUserCity(corbado_user_id: string, city: string) {
    await db.update(({ users }) => {
        const user = users.find(
            (user) => user.corbado_user_id === corbado_user_id,
        );
        if (user) {
            user.city = city;
        }
    });
}
