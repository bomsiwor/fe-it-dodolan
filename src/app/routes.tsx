import { GoogleRedirectPage } from "@/features/auth/components/google-login-success";
import { Login } from "@/features/auth/components/login";
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
        path: "/auth/google-success",
        element: <GoogleRedirectPage />,
    },
]);

export { router };
