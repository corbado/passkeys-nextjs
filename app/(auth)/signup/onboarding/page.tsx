"use client";

// the onboarding is shown after signup, or after login, if it has not yet been completed.
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { updateCity } from "@/app/(auth)/actions";

export default function Onboarding() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    async function onCitySubmit(e: FormEvent) {
        e.preventDefault();
        // update the user's city
        await updateCity(new FormData(formRef.current!));
        // redirect the user to the homepage
        router.push("/");
    }

    return (
        <div>
            <h1>Onboarding</h1>
            <h2>Choose your city</h2>
            <form id="city-form" onSubmit={onCitySubmit} ref={formRef}>
                <input type="text" name="city" />
                <button type="submit">Finish onboarding</button>
            </form>
        </div>
    );
}
