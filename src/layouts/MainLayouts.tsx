import { Outlet } from "react-router-dom";

const MainLayouts = () => {
    return (
        <div>
            <h2>navbar</h2>
            <Outlet />
            <h2>footer</h2>
        </div>
    );
};

export default MainLayouts;