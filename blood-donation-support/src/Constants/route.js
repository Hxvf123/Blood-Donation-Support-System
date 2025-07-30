const ROUTE_PATH = {
  HOME: "/",
  HISTORY: "/history",
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  
  PROFILE: "/user-info",
  UPDATE: "/user-info/update",
  BLOOD_RECEIVE: "/blood-receive",
  BLOOD_DONATION: "/blood-donation",
  CONTACT: "/contact",

  DASHBOARD: "/dashboard",
  INVENTORY: "inventory",
  REQUEST_RECEIVE: "requestsReceive",
  REQUEST_RECEIVE_DETAIL: "requestsReceive/:id",
  REQUEST_DONATION: "requestsDonation",
  REQUEST_DONATION_DETAIL: "requestsDonation/:id",
  EVENT: "event",
  CHECKIN: "checkin",
  MANAGE_ACCOUNT: "manage-account",
  ADD_BLOOD_BAG: "/dashboard/inventory/AddBloodBag/:id",
};

export default ROUTE_PATH;