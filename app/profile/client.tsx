"use client";

import { PasskeyList } from "@corbado/react";
import { User } from "@/lib/server/db";
import { Identifier } from "@corbado/types";

export function Profile({
    dbUser,
    identifiers,
}: {
    dbUser: User;
    identifiers: Identifier[];
}) {
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
                {identifiers.map((identifier) => (
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
            <h2>Manage your Passkeys</h2>
            <PasskeyList />
        </div>
    );
}
