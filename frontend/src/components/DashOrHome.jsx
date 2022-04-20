import { useAtom } from "jotai";
import Dashbord from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import state from "../state";

const DashOrHome = ({ setLogout }) => {
    const [token] = useAtom(state.token);
    if (token) return <Dashbord setLogout={setLogout} />;
    return <HomePage />;
};

export default DashOrHome;
