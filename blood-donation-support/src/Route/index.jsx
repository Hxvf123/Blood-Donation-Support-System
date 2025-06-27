import { createBrowserRouter, RouterProvider } from "react-router";
import ROUTE_PATH from "../Constants/route";
import MainLayout from "../Layout";
import Home from "../Home/Home";

function Routes() {
    const route = createBrowserRouter([
        {
            path: ROUTE_PATH.HOME,
            element: <MainLayout />,
            children: [
                { index: true, element: <Home />}
            ]
        }
    ]);
    return <RouterProvider router={route} />;
}

export default Routes;