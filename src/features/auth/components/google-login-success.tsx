import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

export const GoogleRedirectPage = () => {
    // State
    const [countdown, setCountdown] = useState<number>(5);
    const origin = window.opener; // Reference to the original window
    const [error, setError] = useState<string | null>(null);

    // Effect
    useEffect(() => {
        if (!origin) {
            setError("You don't belongs here");

            return;
        } // Ensure it's opened from another window

        // Countdown logic
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    window.close(); // Close the tab when countdown reaches 0
                }
                return prev - 1;
            });
        }, 1000);

        // Notify the origin before closing
        const handleBeforeUnload = () => {
            origin.postMessage(
                {
                    type: "LOGIN_STATUS",
                    payload: { data: "Aku ingin menjadi" },
                },
                "*",
            );
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup on unmount
        return () => {
            clearInterval(interval);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [origin]);

    return (
        <AuthLayout>
            <Helmet>
                <title>Sukses login google</title>
            </Helmet>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {!error && (
                <>
                    <p className="text-sm text-slate-600 text-center">
                        Login google sukses!
                    </p>

                    <Button>Tutup jendela ini</Button>

                    <p className="text-sm text-muted-foreground text-center">
                        Jendela ini akan menutup otomatis pada {countdown}{" "}
                        detik.
                    </p>
                </>
            )}
        </AuthLayout>
    );
};
