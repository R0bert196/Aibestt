import { useNavigate } from "react-router-dom";


import { useAtom } from "jotai";
import SideBar from '../components/SideBar';
import state from "../state";
import { useState } from "react";
import MainDashPage from "../components/MainDashPage";
import Employees from "../components/Employees";

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
            <div className="text-center">
                <button style={{ backgroundColor: activeSidebar ? 'rgba(255,255,255,.2)' : '#4e73df', position: 'absolute', left: '20px' }} className="rounded-full py-2 px-4 mt-4 z-10 hover:brightness-125" onClick={() => setActiveSidebar(prevActiveSidebar  => !prevActiveSidebar)}>{activeSidebar ? '<' : '>'}</button>
            </div>
            
           {component}
        
            <button
                className="py-2 bg-accent text-white hover:brightness-200 px-4 my-4 rounded-3xl"
                onClick={() => {
                    setLogout();
                    navigate("/");
                    navigate(0);
                }}>
                Logout
            </button>
        </div>
    );
}

export default Dashbord;
