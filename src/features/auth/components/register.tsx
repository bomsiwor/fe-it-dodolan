import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const Register = () => {
    // Navigation
    const navigate = useNavigate();

    // URL
    const [searchParam, setSearchParam] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // State
    const [idPegawaiValue, setIdPegawaiValue] = useState<string>("");

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

    return (
        <AuthLayout>
            <Helmet>
                <title>Register akun baru</title>
            </Helmet>

            {searchParam.get("code") && (
                <>
                    <p className="text-sm text-muted-foreground text-center">
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

            {!searchParam.get("code") && (
                <>
                    <p className="text-sm text-red-400 text-center">
                        Proses registrasi tidak valid.
                    </p>

                    <Button asChild>
                        <Link to={"/"}>Kembali ke halaman awal</Link>
                    </Button>
                </>
            )}
        </AuthLayout>
    );
};
