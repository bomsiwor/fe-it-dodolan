import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    // Navigation
    const navigate = useNavigate();

    // Ref
    const windowRef = useRef<Window | null>(null);
    const messageReceived = useRef(false);

    // State
    const [loginState, setLoginState] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Effect
    // useEffect(() => {
    //     const handleMessage = async (event: MessageEvent) => {
    //         console.log(event.data);
    //         if (event.data?.type === "LOGIN_SUCCESS") {
    //             messageReceived.current = true;
    //
    //             try {
    //                 navigate("/lobby");
    //             } catch (error) {
    //                 console.error(error);
    //                 setError(error as string);
    //             } finally {
    //                 setLoginState(false);
    //             }
    //         }
    //     };
    //
    //     window.addEventListener("message", handleMessage);
    //
    //     return () => {
    //         window.removeEventListener("message", handleMessage);
    //     };
    // }, []);

    // Function
    const openWindow = async () => {
        setError(null);
        // Fetch backend to get google redirect URI
        let result: any;

        try {
            const response = await fetch(
                "http://localhost:3001/api/auth/google/login-attempt",
            );

            // CHeck for error status
            if (response.status !== 200) {
                throw new Error("Percobaan login gagal, coba lagi");
            }

            result = await response.json();

            // CHeck for redirectUri
            if (!result.data.redirectUrl) {
                throw new Error("Percobaan login gagal, coba lagi");
            }
        } catch (error) {
            setError(
                error instanceof Error ? error.message : (error as string),
            );
            return;
        }

        messageReceived.current = false;

        if (!windowRef.current || windowRef.current.closed) {
            windowRef.current = window.open(
                result.data.redirectUrl, // Open backend google login redirect
                "google-login",
                "width=500,height=500",
            );

            setLoginState(true);
        }

        // Start interval to check if the window is force-closed
        const checkClosed = setInterval(() => {
            if (!windowRef.current) {
                clearInterval(checkClosed);

                // Check for accessToken
                // Redirect to lobby if accesstoken already exists
                if (!localStorage.getItem("accessToken")) {
                    setLoginState(false);
                    setError("Ada kesalahan saat proses login. Coba lagi.");
                } else {
                    navigate("/lobby");
                }
            }
        }, 500);
    };

    return (
        <AuthLayout>
            <Helmet>
                <title>Welcome IT!</title>
            </Helmet>

            <p className="text-sm text-muted-foreground text-center">
                Aplikasi ini hanya mendukung login menggunakan Google.
            </p>

            <Button
                variant={"outline"}
                className="rounded-3xl py-6 mt-4"
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
