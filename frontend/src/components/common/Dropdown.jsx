import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import state from "../../state";

function Dropdown({ setDropdown }) {

    const setLogout = () => {
    setToken("");
    };
    
    const [token, setToken] = useAtom(state.token);
    const navigate = useNavigate();

  return (
    <div className='absolute -left-24 top-16 py-2 shadow bg-white rounded-md'>
                <ul className=''>
              <li className='px-4 hover:bg-secondary'>
                  
                    <FontAwesomeIcon
                      style={{ color: "#d1d3e2" }}
                      icon={faUser}
                      className='mr-2'
                    />
                    <Link
                      to={"/profile"}
                      style={{ color: "#3a3b45" }}
                      className='hover:brightness-150'
                      onClick={() => setDropdown(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <div
                      className='my-4'
                      style={{ borderTop: "1px solid #e3e6f0" }}
                    ></div>
                  </li>
                  <li className='px-4 hover:bg-secondary'>
                    <FontAwesomeIcon
                      style={{ color: "#d1d3e2" }}
                      icon={faArrowRightFromBracket}
                      className='mr-2'
                    />
                    <button
                      className='hover:text-accent'
                      onClick={() => {
                        setLogout();
                        navigate("/");
                        navigate(0);
                        setDropdown(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
  )
}

export default Dropdown