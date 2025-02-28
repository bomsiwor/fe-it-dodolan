import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetcher } from "@/utils/fetch";
import { TRedirectURI } from "../types/type.auth";

interface ILoginResponse {
    success: boolean;
    error?: string;
}

export const Login = () => {
    // Navigation
    const navigate = useNavigate();

    // Ref
    const windowRef = useRef<Window | null>(null);
    const checkIntervalRef = useRef<number | null>(null);

    // State
    const [loginState, setLoginState] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Callback
    const cleanUp = useCallback(() => {
        // Clear interval by its interval ID
        // set interval ID from ref after clearing
        if (checkIntervalRef.current !== null) {
            window.clearInterval(checkIntervalRef.current);

            checkIntervalRef.current = null;
        }
    }, []);

    // Effect
    useEffect(() => {
        // Redirect to lobby if user already has access token
        // Run for first time only
        if (localStorage.getItem("accessToken")) {
            navigate("/lobby");

            return;
        }

        // Add event listener to listen message
        const handleMessage = (e: MessageEvent) => {
            const data = e.data as ILoginResponse;

            // Set error if data is not success and giving error
            if (!data.success) {
                setError(data.error || "Login gagal");
            }

            // Clear interval to prevent error collition
            cleanUp();
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
            cleanUp();
        };
    }, [cleanUp, navigate]);

    // Function
    const openWindow = async () => {
        setError(null);

        // Fetch backend to get google redirect URI
        let result: TRedirectURI;

        try {
            const response = await fetcher<TRedirectURI>(
                "auth/google/login-attempt",
                "GET",
            );

            // CHeck for redirectUri
            if (!response.data.redirectUrl) {
                throw new Error("Percobaan login gagal, coba lagi");
            }

            result = response.data;
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Percobaan login gagal. Coba lagi.",
            );
            return;
        }

        // Open new window if not window opened.
        if (!windowRef.current || windowRef.current.closed) {
            // Set windowRef from opened window
            windowRef.current = window.open(
                result.redirectUrl, // Open backend google login redirect
                "google-login",
                "width=500,height=500",
            );

            setLoginState(true);
        }

        // Start interval to check if the window is force-closed
        // or user manually closed window.
        checkIntervalRef.current = window.setInterval(() => {
            // Check for window is closed or not exists
            if (windowRef.current && windowRef.current.closed) {
                setError("Login gagal, jendela ditutup dini");
                setLoginState(false);

                cleanUp();
            }
        }, 500);
    };

    return (
        <AuthLayout>
            <Helmet>
                <title>Welcome IT!</title>
            </Helmet>

            <p className="text-center text-sm text-muted-foreground">
                Aplikasi ini hanya mendukung login menggunakan Google.
            </p>

            <Button
                variant={"outline"}
                className="mt-4 rounded-3xl py-6"
                disabled={loginState}
                onClick={openWindow}
            >
                {loginState && <Loader2 className="animate-spin" />}
                {loginState
                    ? "Memproses login kamu"
                    : "Lanjutkan dengan Google"}
            </Button>

            <p className="text-sm text-red-400">{error}</p>
        </AuthLayout>
    );
};
