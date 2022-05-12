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
      <nav style={{ display: activeSidebar ? 'block' : 'none'}} className="mw768:w-28 px-16 bg-primary text-white transition-all duration-300 z-10">
          <div className="mw768:-left-14 mw768:relative font-bold py-6 px-4 align-center text-center text-xl">
              <Link to={'/'} className="hover:text-white">AIBEST</Link>
          </div>

            

          <ul style={{ color: 'rgba(255,255,255,.8)', left: '-50px' }} className="relative md:hidden">
              <li className="py-4 flex">
                  <FontAwesomeIcon icon={faUser} className='mr-1'/>
                  <Link to={'/'} className="hover:text-white">Dashboard</Link>
              </li>
              <li className="py-4 flex">
                  <FontAwesomeIcon icon={faUser} className='mr-1'/>
                  <Link to={'/profile'} className="hover:text-white">Profile</Link>
              </li>
              <li className="py-4 flex">
                  <FontAwesomeIcon icon={faTable} className='mr-1'/>
                  <Link to={'/employees'} className="hover:text-white">UPLOAD</Link>
              </li>
              {/* <li className="py-4">
                  <Link to={'/login'} className="hover:text-white">Login</Link>
              </li>
              <li className="py-4">
                  <Link to={'/register'} className="hover:text-white">Register</Link>
              </li> */}
              <li className="py-4 flex">
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