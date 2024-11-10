"use client";

import { CorbadoProvider } from "@corbado/react";
import englishTranslations from "@/lib/corbado-translations";

export default function WrappedCorbadoProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // obtain the Corbado project ID from the environment variables
    const projectId = process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID;
    if (!projectId) {
        throw new Error("Missing Corbado project ID");
    }
    return (
        <CorbadoProvider
            projectId={projectId}
            // enable dark mode for the Corbado UI
            darkMode="on"
            // store the users session-token in a cookie called 'cbo_session_token'
            setShortSessionCookie
            // apply our custom styles to the Corbado UI
            theme="cbo-custom-styles"
            // use our custom translations
            customTranslations={{ en: englishTranslations }}
        >
            {children}
        </CorbadoProvider>
    );
}
