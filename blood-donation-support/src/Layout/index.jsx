import { Outlet } from "react-router";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

function MainLayout() {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout;