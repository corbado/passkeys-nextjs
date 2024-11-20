"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCorbado } from "@corbado/react";

export default function Navigation({
    initialIsAutenticated,
}: {
    initialIsAutenticated: boolean;
}) {
    const pathName = usePathname();
    const { loading, isAuthenticated } = useCorbado();

    // Use the server-side obtained value as the initial value
    // Once loaded, use the value obtained on the client-side from useCorbado()
    // This prevents "flickering" after the initial load
    const currentIsAuthenticated = loading
        ? initialIsAutenticated
        : isAuthenticated;

    return (
        <div>
            <nav>
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="Corbado logo"
                        width="40"
                        height="40"
                    />
                    <p>Corbado Example</p>
                </Link>
                <ul>
                    <li>
                        <Link href="/" data-selected={pathName === "/"}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/userarea"
                            data-selected={pathName === "/userarea"}
                        >
                            User area
                        </Link>
                    </li>
                    {currentIsAuthenticated ? (
                        <li>
                            <Link
                                href="/profile"
                                data-selected={pathName === "/profile"}
                            >
                                Profile
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link
                                href="/signup"
                                data-selected={pathName === "/signup"}
                            >
                                Sign up
                            </Link>
                        </li>
                    )}
                </ul>
                {currentIsAuthenticated ? (
                    <LogoutButton />
                ) : (
                    <Link href="/login" data-selected={pathName === "/login"}>
                        Login
                    </Link>
                )}
            </nav>
        </div>
    );
}

function LogoutButton() {
    const { logout, loading } = useCorbado();
    const router = useRouter();

    async function onLogout() {
        if (loading) {
            return;
        }
        await logout();
        router.push("/");
    }

    return (
        <button onClick={onLogout} disabled={loading}>
            Logout
        </button>
    );
}
