import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
    return (
        <div className="flexLayout">

            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayouts;