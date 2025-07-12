import { createBrowserRouter, RouterProvider } from "react-router";
import ROUTE_PATH from "../Constants/route";
import MainLayout from "../Layout";
import Home from "../Home/Home";
import History from "../History/History";

function Routes() {
    const route = createBrowserRouter([
        {
            path: ROUTE_PATH.HOME,
            element: <MainLayout />,
            children: [
                { index: true, element: <Home />},
                {path: ROUTE_PATH.HISTORY, element: <History />},
            ]
        }
    ]);
    return <RouterProvider router={route} />;
}

export default Routes;