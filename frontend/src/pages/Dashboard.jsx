import { useNavigate } from "react-router-dom";


import { useAtom } from "jotai";
import SideBar from '../components/SideBar';
import state from "../state";
import { useState } from "react";
import MainDashPage from "../components/MainDashPage";
import Employees from "../components/Employees";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ToggleSidebarButton from "../components/ToggleSidebarButton";

function Dashbord({component}) {
    const [token, setToken] = useAtom(state.token);

    const [activeSidebar, setActiveSidebar] = useState(false);

    const navigate = useNavigate();

    const setLogout = () => {
        setToken("");
    };

  


    
    return (
        
        <div className='container mx-auto flex'>
            <SideBar isActive={activeSidebar} setIsActive={setActiveSidebar} />
            <ToggleSidebarButton activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar}/>
           {component}
        
            {/* <button
                className="py-2 bg-accent text-white hover:brightness-200 px-4 my-4 rounded-3xl"
                onClick={() => {
                    setLogout();
                    navigate("/");
                    navigate(0);
                }}>
                Logout
            </button> */}
        </div>
    );
}

export default Dashbord;
