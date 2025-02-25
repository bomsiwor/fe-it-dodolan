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
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login-attempt",
        element: <LoginAttempt />,
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
