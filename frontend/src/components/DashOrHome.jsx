import { useAtom } from "jotai";
import Dashbord from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import state from "../state";

const DashOrHome = () => {
    const [token] = useAtom(state.token);
    
    if (token) return <Dashbord />;
    return <HomePage />;
};

export default DashOrHome;
