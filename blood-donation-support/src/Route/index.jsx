import { createBrowserRouter, RouterProvider } from "react-router";
import ROUTE_PATH from "../Constants/route";

import MainLayout from "../Layout/User";
import ManagerLayout from "../Layout/Manager";

import Home from "../Home/Home";
import History from "../History/History";
import Registermem from "../RegisterMem/Register";
import Login from "../Login/Login";
import ForgotPass from "../Login/ForgotPass";
import Profile from "../userInfoForm/userInfoForm";
import UpdateInfo from "../userInfoForm/updateUser";
import Receive from "../BloodReceive/Receive";
import Donation from "../BloodDonation/Donation";
import Contact from "../Contact/Contact";

import RequestList from "../Manager/Request/RequestList";
import RequestDetail from "../Manager/Request/RequestDetail";
import Dashboard from "../Manager/Dashboard/Dashboard";
import Inventory from "../Manager/Inventory/BloodInventory"; 
import Event from "../Manager/Event/EventForm";

import ManageAccount from "../Admin/ManagerAccount";

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
                { path: ROUTE_PATH.UPDATE, element: <UpdateInfo /> },
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
                { path: ROUTE_PATH.EVENT, element: <Event /> },
                { path: ROUTE_PATH.MANAGE_ACCOUNT, element: <ManageAccount /> },
            ]
        }
    ]);
    return <RouterProvider router={route} />;
}

export default Routes;