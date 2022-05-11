import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import ToggleSidebarButton from "./ToggleSidebarButton";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../state";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [activeSidebar, setActiveSidebar] = useState(false);
  const navigate = useNavigate();
  const [dropDown, setDropdown] = useState(false);

  const setLogout = () => {
    setToken("");
  };

const [token, setToken] = useAtom(state.token);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();

    const getUsername = async () => {
      try {
        const response = await axiosPrivate.get("getUsername", {
          signal: controller.signal,
        });
        setUsername(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const getCompany = async () => {
      try {
        const response = await axiosPrivate.get("getCompany", {
          signal: controller.signal,
        });
        setCompany(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsername();
    getCompany();
  }, []);

  return (
    <section className=' py-3 bg-white shadow inset-x-0'>
      <nav className='flex justify-between container px-2'>
        <div className='flex items-center'>
          <ToggleSidebarButton
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
          />
          <div
            style={{
              borderRight: "1px solid #e3e6f0",
              height: "calc(4.375rem - 2rem)",
            }}
            className=' my-auto mx-4'
          ></div>
          <ul className='flex gap-2 items-center mw768:hidden'>
            <li className='py-4'>
              <Link
                to={"/"}
                className='font-bold hover:border-b-2 border-primary'
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to={"/companies/1"}
                className='font-bold hover:border-b-2 border-primary'
              >
                DASHBOARD
              </Link>
            </li>
            <li className='py-4'>
              <Link
                to={"/profile"}
                className='font-bold hover:border-b-2 border-primary'
              >
                PROFILE
              </Link>
            </li>
            <li className='py-4'>
              <Link
                to={"/employees"}
                className='font-bold hover:border-b-2 border-primary'
              >
                TABLE
              </Link>
            </li>
          </ul>
        </div>

        <ul className='flex gap-2 items-center'>
          <li>
            <h3 className='text-xl'>{company}</h3>
          </li>
          <li>
            <div
              style={{
                borderRight: "1px solid #e3e6f0",
                height: "calc(4.375rem - 2rem)",
              }}
              className=' my-auto mx-4'
            ></div>
          </li>
          <li className='mr-4'>
            <h3 className='text-xl'>{username}</h3>
          </li>
          <li className='relative'>
            <FontAwesomeIcon
              // style={{ color: "#dddfeb" }}
              icon={faUserCircle}
              className='text-3xl cursor-pointer hover:text-gray'
              onClick={() => setDropdown((oldDropdown) => !oldDropdown)}
            />
            {dropDown && (
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
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavBar;
