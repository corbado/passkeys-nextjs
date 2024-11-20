"use client";

import { useState } from "react";
import { useCorbado } from "@corbado/react";

// enforce query state invariants through this type
// Usually, using react-query would be advised
type QueryResult =
    | {
          // Query not triggered yet
          loading: false;
          error: undefined;
          secret: undefined;
      }
    | {
          // loading state
          loading: true;
          error: undefined;
          secret: undefined;
      }
    | {
          // success state
          loading: false;
          error: undefined;
          secret: string;
      }
    | {
          // error state
          loading: false;
          error: string;
          secret: undefined;
      };

export default function LoggedInUserArea() {
    const { sessionToken } = useCorbado();

    function makeApiRequest() {
        return fetch("/api/secret", {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
        });
    }

    const [queryResult, setQueryResult] = useState<QueryResult>({
        loading: false,
        error: undefined,
        secret: undefined,
    });

    async function onRevealSecret() {
        if (!sessionToken) {
            setQueryResult({
                loading: false,
                error: "No session token",
                secret: undefined,
            });
        }
        try {
            setQueryResult({
                loading: true,
                error: undefined,
                secret: undefined,
            });
            const rsp = await makeApiRequest();
            if (!rsp.ok) {
                throw new Error(`Status: ${rsp.status}`);
            }
            const json = await rsp.json();
            setQueryResult({
                loading: false,
                error: undefined,
                secret: json.secret,
            });
        } catch (e) {
            console.warn(e);
            setQueryResult({
                loading: false,
                error: `Failed to fetch secret. ${e}`,
                secret: undefined,
            });
        }
    }

    return (
        <div>
            <h1>User area!</h1>
            <p>Since you are logged in, we can tell you a secret:</p>
            <button
                onClick={onRevealSecret}
                disabled={queryResult.loading || !!queryResult.secret}
            >
                Reveal secret
            </button>
            <QueryResult queryResult={queryResult} />
        </div>
    );
}

function QueryResult({ queryResult }: { queryResult: QueryResult }) {
    // handle all possible outcomes here
    if (queryResult.loading) {
        return <div className="loader" />;
    }
    if (queryResult.error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{queryResult.error}</p>
            </div>
        );
    }
    if (!queryResult.secret) {
        return null;
    }
    return (
        <div id="secret-box">
            <h3>Secret: </h3>
            <p>{queryResult.secret}</p>
        </div>
    );
}
