import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../state";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function SideBar({ isActive, setIsActive }) {

    const setLogout = () => {
        setToken("");
    };

    const navigate = useNavigate();

    const [token, setToken] = useAtom(state.token);

  return (
      <nav style={{ left: isActive ? '0' : '-100%', position: isActive ? 'fiexd' : 'fixed', height: '100%'}} className="px-16 bg-primary text-white relative transition-all duration-300">
          <div className="font-bold py-6 px-4 align-center text-center">
              <Link to={'/'} className="hover:text-white">AIBEST</Link>
          </div>
          <ul style={{ color: 'rgba(255,255,255,.8)', left: '-50px' }} className="relative">
              <li className="py-4">
                  <Link to={'/profile'} className="hover:text-white">Profile</Link>
              </li>
              <li className="py-4">
                  <Link to={'/employees'} className="hover:text-white">Table</Link>
              </li>
              <li className="py-4">
                  <Link to={'/login'} className="hover:text-white">Login</Link>
              </li>
              <li className="py-4">
                  <Link to={'/register'} className="hover:text-white">Register</Link>
              </li>
              <li className="py-4">
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