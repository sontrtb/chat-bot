import Layout from "@/components/layout/layout";
import ChatScreen from "@/pages/chat";
import HomeScreen from "@/pages/home";
import Login from "@/pages/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,

    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomeScreen />,
            },
            {
                path: "/chat",
                element: <ChatScreen />,
            },
            {
                path: "/chat/:chatId",
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