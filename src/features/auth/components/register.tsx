import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { fetcher } from "@/utils/fetch";
import { ITokens } from "../types/type.auth";

export const Register = () => {
    // Navigation
    const navigate = useNavigate();

    // URL
    const [searchParam] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // State
    const origin = window.opener;
    const [idPegawaiValue, setIdPegawaiValue] = useState<string>("");

    // Effect
    useEffect(() => {
        // Ensure it's opened fron other window
        if (!origin) {
            setError("Tidak dapat melanjutkan proses.");
            return;
        }

        if (!searchParam.get("code")) {
            window.close();
        }
    }, [searchParam, origin]);

    // Function
    const handleMaxLimit = (event: ChangeEvent<HTMLInputElement>) => {
        const current = event.currentTarget.value;

        if (current.length > 5) {
            return;
        }

        setIdPegawaiValue(current);
    };

    const handleSubmit = async () => {
        const payload = {
            code: searchParam.get("code"),
            pegawaiId: idPegawaiValue,
        };

        try {
            setIsLoading(true);

            const response = await fetcher<ITokens>("", "POST", {
                body: payload,
            });

            // Check for token
            if (!response.data.accessToken || !response.data.refreshToken) {
                setError(
                    "Proses registrasi tidak dapat dilanjutkan. Coba lagi",
                );
                return;
            }

            // Store token to localstorage
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            // Navigate to success page
            navigate("/auth/google-success");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);

            window.close();
        }
    };

    // Handle close button
    const handleCloseWindow = (e: MouseEvent) => {
        e.preventDefault();

        window.close();
    };

    return (
        <AuthLayout>
            <Helmet>
                <title>Register akun baru</title>
            </Helmet>

            {!error && (
                <>
                    <p className="text-center text-sm text-muted-foreground">
                        Kamu akun baru ya? Isikan ID Pegawai kamu ya 😄.
                    </p>

                    <div className="flex gap-2">
                        <Input
                            type="number"
                            pattern="/\d{2,5}/"
                            value={idPegawaiValue}
                            onChange={handleMaxLimit}
                        />

                        <Button onClick={handleSubmit} disabled={isLoading}>
                            {isLoading && <Loader2 className="animate-spin" />}
                            {isLoading ? "Processing" : "Submit"}
                        </Button>
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}
                </>
            )}

            {error && (
                <>
                    <p className="text-center text-sm text-red-400">
                        Proses registrasi tidak valid. {error}
                    </p>

                    <Button onClick={handleCloseWindow}>
                        Kembali ke halaman awal
                    </Button>
                </>
            )}
        </AuthLayout>
    );
};
