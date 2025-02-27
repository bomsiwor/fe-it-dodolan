import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetcher } from "@/utils/fetch";
import { ITokens } from "../types/type.auth";

export const LoginAttempt = () => {
    // Navigation
    const navigate = useNavigate();

    // URL
    const [searchParam] = useSearchParams();
    const [error, setError] = useState<string | null>(null);

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
                const payload = {
                    code: searchParam.get("code"),
                };

                const response = await fetcher<ITokens>(
                    "auth/token-request",
                    "POST",
                    {
                        body: payload,
                    },
                );

                // Check for token
                if (!response.data.accessToken || !response.data.refreshToken) {
                    window.close();
                }

                // Store token to localstorage
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem(
                    "refreshToken",
                    response.data.refreshToken,
                );

                // Navigate to success page
                navigate("/auth/google-success");
            } catch (error) {
                console.error(error);

                window.close();
            }
        };

        handleGetToken();

        return () => {};
    }, [navigate, origin, searchParam]);

    // Function

    return (
        <AuthLayout>
            <Helmet>
                <title>Proses login</title>
            </Helmet>

            {searchParam.get("code") && error && (
                <p className="text-sm text-red-400">{error}</p>
            )}

            {!searchParam.get("code") && (
                <>
                    <p className="text-center text-sm text-red-400">
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
