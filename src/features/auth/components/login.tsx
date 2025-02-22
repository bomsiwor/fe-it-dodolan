import { Button } from "@/components/ui/button";
import { AuthLayout } from "./layout.auth";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const Login = () => {
    const [loginState, setLoginState] = useState<boolean>(true);

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
            >
                {loginState && <Loader2 className="animate-spin" />}
                {loginState
                    ? "Memproses login kamu"
                    : "Lanjutkan dengan Google"}
            </Button>
        </AuthLayout>
    );
};
