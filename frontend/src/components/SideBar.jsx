import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';

function SideBar( ) {

    const setLogout = () => {
        setToken("");
    };

    const [activeSidebar, setActiveSidebar] = useAtom(state.activeSidebar);


    const navigate = useNavigate();

    const [token, setToken] = useAtom(state.token);

    //TODO SA TRIMIT ISACTIVE PRIN SIDEBARBUTTON CARE SA II DEA TOGGLE

  return (
      <nav style={{ left: activeSidebar ? '0' : '-100%'}} className="px-16 bg-primary text-white relative transition-all duration-300 z-10">
          <div className="font-bold py-6 px-4 align-center text-center text-xl">
              <Link to={'/'} className="hover:text-white">AIBEST</Link>
          </div>

            

          <ul style={{ color: 'rgba(255,255,255,.8)', left: '-50px' }} className="relative md:hidden">
                <li className="py-4">
                  <FontAwesomeIcon icon={faUser} className='mr-1'/>
                  <Link to={'/companies/1'} className="hover:text-white">Dashboard</Link>
              </li>
              <li className="py-4">
                  <FontAwesomeIcon icon={faUser} className='mr-1'/>
                  <Link to={'/profile'} className="hover:text-white">Profile</Link>
              </li>
              <li className="py-4">
                  <FontAwesomeIcon icon={faTable} className='mr-1'/>
                  <Link to={'/employees'} className="hover:text-white">Table</Link>
              </li>
              {/* <li className="py-4">
                  <Link to={'/login'} className="hover:text-white">Login</Link>
              </li>
              <li className="py-4">
                  <Link to={'/register'} className="hover:text-white">Register</Link>
              </li> */}
              <li className="py-4">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-1'/>
                  <button
                      className="hover:text-accent"
                      onClick={() => {
                          setLogout();
                          navigate("/");
                          navigate(0);
                      }}>
                      Logout
                  </button>
              </li>
          </ul>
        
    </nav>
  )
}

export default SideBar