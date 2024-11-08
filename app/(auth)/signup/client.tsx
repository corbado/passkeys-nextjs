"use client";

import { useRouter } from "next/navigation";
import { CorbadoAuth } from "@corbado/react";
import { handleUserLogin } from "@/app/(auth)/actions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

async function onSignedIn(router: AppRouterInstance) {
    const rsp = await handleUserLogin();
    if (rsp.success && !rsp.hasCompletedOnboarding) {
        // show the user the post-signup screen in case his account was
        // just created
        router.push("/signup/onboarding");
    } else {
        // otherwise, just redirect to his profile
        router.push("/profile");
    }
}

export function Signup() {
    const router = useRouter();

    return (
        <div>
            <h1>Signup</h1>
            <CorbadoAuth
                onLoggedIn={() => onSignedIn(router)}
                initialBlock="signup-init"
            />
        </div>
    );
}
