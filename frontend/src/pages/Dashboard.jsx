import { useNavigate } from "react-router-dom";


import { useAtom } from "jotai";
import SideBar from '../components/SideBar';
import state from "../state";
import { useState } from "react";
import MainDashPage from "../components/MainDashPage";
import Employees from "../components/Employees";

import ToggleSidebarButton from "../components/ToggleSidebarButton";

function Dashbord({component}) {
    const [token, setToken] = useAtom(state.token);

    const [activeSidebar, setActiveSidebar] = useState(false);

    const navigate = useNavigate();

    const setLogout = () => {
        setToken("");
    };


    return (
        
        <div className='container mx-auto flex min-h-[92vh]'>
            <SideBar isActive={activeSidebar} setIsActive={setActiveSidebar} />
            <ToggleSidebarButton activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar}/>
           {component}
        </div>
    );
}

export default Dashbord;
