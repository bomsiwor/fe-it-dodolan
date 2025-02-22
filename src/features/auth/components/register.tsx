import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";

export const Register = () => {
    // URL
    const [searchParam, setSearchParam] = useSearchParams();

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

                        <Button>Submit</Button>
                    </div>
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
