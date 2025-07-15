import { createBrowserRouter, RouterProvider } from "react-router";
import ROUTE_PATH from "../Constants/route";

import MainLayout from "../Layout/index";
import ManagerLayout from "../Layout/Manager";

import Home from "../Home/Home";
import History from "../History/History";
import Registermem from "../RegisterMem/Register";
import Login from "../Login/Login";
import ForgotPass from "../Login/ForgotPass";
import Profile from "../userInfoForm/userInfoForm";
import Receive from "../BloodReceive/Receive";
import Donation from "../BloodDonation/Donation";
import Contact from "../Contact/Contact";

import RequestList from "../Request/RequestList";
import RequestDetail from "../Request/RequestDetail";
import Dashboard from "../Dashboard/Dashboard";
import Inventory from "../Inventory/BloodInventory";    

function Routes() {
    const route = createBrowserRouter([
        {
            path: ROUTE_PATH.HOME,
            element: <MainLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: ROUTE_PATH.HISTORY, element: <History /> },
                { path: ROUTE_PATH.REGISTER, element: <Registermem /> },
                { path: ROUTE_PATH.LOGIN, element: <Login /> },
                { path: ROUTE_PATH.FORGOT_PASSWORD, element: <ForgotPass /> },
                { path: ROUTE_PATH.PROFILE, element: <Profile /> },
                { path: ROUTE_PATH.BLOOD_RECEIVE, element: <Receive /> },
                { path: ROUTE_PATH.BLOOD_DONATION, element: <Donation /> },
                { path: ROUTE_PATH.CONTACT, element: <Contact /> },
            ]
        },

        {
            path: ROUTE_PATH.DASHBOARD,
            element: <ManagerLayout />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: ROUTE_PATH.INVENTORY, element: <Inventory /> },
                { path: ROUTE_PATH.REQUEST_LIST, element: <RequestList /> },
                { path: ROUTE_PATH.REQUEST_DETAIL, element: <RequestDetail /> },
            ]
        }
    ]);
    return <RouterProvider router={route} />;
}

export default Routes;