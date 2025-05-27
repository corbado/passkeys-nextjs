"use client";

import { CorbadoProvider } from "@corbado/react";
import englishTranslations from "@/lib/corbado-translations";
import React, { useEffect, useRef } from "react";
import { sendEvent, TelemetryEventType } from "@corbado/shared-util";

export default function WrappedCorbadoProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // obtain the Corbado project ID from the environment variables
    const projectId = process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID;

    const hasSentTelemetry = useRef(false);

    useEffect(() => {
        if (
            hasSentTelemetry.current ||
            !projectId ||
            process.env.NEXT_PUBLIC_CORBADO_TELEMETRY_DISABLED === "true"
        )
            return;

        void sendEvent({
            type: TelemetryEventType.EXAMPLE_APPLICATION_OPENED,
            payload: {
                exampleName: "corbado/passkeys-nextjs",
            },
            sdkVersion: "3.1.0",
            sdkName: "React SDK",
            identifier: projectId,
        });

        hasSentTelemetry.current = true;
    }, [projectId]);

    if (!projectId) {
        throw new Error("Missing Corbado project ID");
    }

    return (
        <CorbadoProvider
            projectId={projectId}
            // enable dark mode for the Corbado UI
            darkMode="on"
            // apply our custom styles to the Corbado UI
            theme="cbo-custom-styles"
            // use our custom translations
            customTranslations={{ en: englishTranslations }}
            telemetry={
                process.env.NEXT_PUBLIC_CORBADO_TELEMETRY_DISABLED === "true"
                    ? false
                    : undefined
            }
        >
            {children}
        </CorbadoProvider>
    );
}
