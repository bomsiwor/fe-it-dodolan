import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const LoginAttempt = () => {
    // Navigation
    const navigate = useNavigate();

    // URL
    const [searchParam, setSearchParam] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Effect
    useEffect(() => {
        const handleGetToken = async () => {
            try {
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

                // Add type
                const result = await response.json();

                // Store token to localstorage
                localStorage.setItem("accessToken", result.data.accessToken);
                localStorage.setItem("refreshToken", result.data.refreshToken);

                // Navigate to success page
                navigate("/auth/google-success");
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        handleGetToken();
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
