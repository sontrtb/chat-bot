import Layout from "@/components/layout/layout";
import ChatScreen from "@/pages/chat";
import HomeScreen from "@/pages/home";
import Login from "@/pages/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UnauthenticatedProtectedRoute from "./unauthenticated-protected-route";
import BackgroundService from "@/background-service";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,

    },
    {
        path: "/",
        element:
            <UnauthenticatedProtectedRoute>
                <BackgroundService>
                    <Layout />
                </BackgroundService>
            </UnauthenticatedProtectedRoute>,
        children: [
            {
                path: "/",
                element: <HomeScreen />,
            },
            {
                path: "/chat",
                element: <ChatScreen />,
            },
        ],
    },
]);

function Routers() {
    return (
        <RouterProvider router={router} />
    )
}

export default Routers