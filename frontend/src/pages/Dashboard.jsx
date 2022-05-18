import { useNavigate } from "react-router-dom";
import SideBar from "../components/common/SideBar";
import { useState } from "react";
import NavBar from "../components/common/NavBar";
import ToggleSidebarButton from "../components/common/ToggleSidebarButton";
import { useAtom } from "jotai";
import state from "../state";

function Dashbord({ component }) {
  const [token, setToken] = useAtom(state.token);

  // const [activeSidebar, setActiveSidebar] = useState(false);

  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useAtom(state.activeSidebar);

  const setLogout = () => {
    setToken("");
  };

  return (
    <>
      <div className='mx-auto min-h-[92vh]'>
        <NavBar />
        <div className='container h-full min-h-[92vh]'>
          <SideBar />
          {/* <ToggleSidebarButton activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar}/> */}
          {component}
        </div>
      </div>
    </>
  );
}

export default Dashbord;
