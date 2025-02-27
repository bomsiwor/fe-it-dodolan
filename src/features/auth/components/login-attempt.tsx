import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export const LoginAttempt = () => {
    // Navigation
    const navigate = useNavigate();

    // URL
    const [searchParam, setSearchParam] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // State
    const origin = window.opener; // Reference to the original window

    // Effect
    useEffect(() => {
        if (!origin) {
            setError("You don't belongs here");

            return;
        } // Ensure it's opened from another window

        const handleGetToken = async () => {
            try {
                // Default success value is false
                // succcessRef.current = false;
                setIsLoading(true);

                const payload = {
                    code: searchParam.get("code"),
                };

                const response = await fetch(
                    "http://localhost:3001/api/auth/token-request",
                    {
                        method: "POST",
                        body: JSON.stringify(payload),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );

                // Check for response
                if (response.status !== 200) {
                    window.close();
                }

                // Add type
                const result = await response.json();

                // Check for token
                if (!result.data?.accessToken || !result.data?.refreshToken) {
                    window.close();
                }

                // Store token to localstorage
                localStorage.setItem("accessToken", result.data?.accessToken);
                localStorage.setItem("refreshToken", result.data?.refreshToken);

                // Navigate to success page
                navigate("/auth/google-success");
            } catch (error) {
                window.close();
            }
        };

        handleGetToken();

        return () => {};
    }, []);

    // Function

    return (
        <AuthLayout>
            <Helmet>
                <title>Proses login</title>
            </Helmet>

            {searchParam.get("code") && (
                <>{error && <p className="text-sm text-red-400">{error}</p>}</>
            )}

            {!searchParam.get("code") && (
                <>
                    <p className="text-sm text-red-400 text-center">
                        Proses login tidak valid.
                    </p>

                    <Button asChild>
                        <Link to={"/"}>Kembali ke halaman awal</Link>
                    </Button>
                </>
            )}
        </AuthLayout>
    );
};
