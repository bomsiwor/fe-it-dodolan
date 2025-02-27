import { GoogleRedirectPage } from "@/features/auth/components/google-login-success";
import { Login } from "@/features/auth/components/login";
import { LoginAttempt } from "@/features/auth/components/login-attempt";
import { Register } from "@/features/auth/components/register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/login-attempt",
        element: <LoginAttempt />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/auth/google-success",
        element: <GoogleRedirectPage />,
    },
    {
        path: "/lobby",
        element: <div>Sudah login ya</div>,
    },
]);

export { router };
