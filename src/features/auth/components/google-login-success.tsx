import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { count } from "node:console";

export const GoogleRedirectPage = () => {
    // State
    const [countdown, setCountdown] = useState<number>(5);

    // Effect
    useEffect(() => {
        if (countdown == 0) {
            return;
        }

        // Setinterval
        const interval = setInterval(() => {
            setCountdown((count) => count - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countdown]);

    return (
        <AuthLayout>
            <Helmet>
                <title>Sukses login google</title>
            </Helmet>

            <p className="text-sm text-slate-600 text-center">
                Login google sukses!
            </p>

            <Button>Tutup jendela ini</Button>

            <p className="text-sm text-muted-foreground text-center">
                Jendela ini akan menutup otomatis pada {countdown} detik.
            </p>
        </AuthLayout>
    );
};
