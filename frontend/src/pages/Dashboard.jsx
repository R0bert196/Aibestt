import { useNavigate } from "react-router-dom";

import DoughnutGraph from "../components/DoughnutGraph";
import EmployeeGraph from "../components/EmployeeGraph";
import IndiactorCard from "../components/IndicatorCard";
import { useAtom } from "jotai";
import SideBar from '../components/SideBar';
import state from "../state";
import { useState } from "react";

function Dashbord() {
    const [token, setToken] = useAtom(state.token);

    const [activeSidebar, setActiveSidebar] = useState(true);

    const navigate = useNavigate();

    const setLogout = () => {
        setToken("");
    };

    return (
        <div className='flex'>
            <SideBar isActive={activeSidebar} setIsActive={setActiveSidebar} />
            <div className="text-center">
                <button style={{ backgroundColor: activeSidebar ? 'rgba(255,255,255,.2)' : '#4e73df', position: 'absolute', left: '20px' }} className="rounded-full py-2 px-4 mt-4 z-10 hover:brightness-125" onClick={() => setActiveSidebar(!activeSidebar)}>{activeSidebar ? '<' : '>'}</button>
            </div>
            <div style={{}} className="container mx-auto px-4 max-w-5xl overflow-hidden min-w-fit transition-all duration-300">
                <div className="text-gray-900 text-3xl mt-8">
                    <h1>Dashboard</h1>
                </div>
                <div className="flex flex-wrap">
                    <IndiactorCard />
                    <IndiactorCard />
                    <IndiactorCard />
                    <IndiactorCard />
                </div>
                <div className="flex">
                    <DoughnutGraph />
                    <DoughnutGraph />
                </div>
                <div className="my-8">
                    <EmployeeGraph />
                </div>
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
