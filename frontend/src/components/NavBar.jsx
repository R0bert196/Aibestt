import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import ToggleSidebarButton from "./ToggleSidebarButton";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../state";
import Dropdown from "./Dropdown";

function NavBar() {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [dropDown, setDropdown] = useState(false);

  

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
                UPLOAD
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
              icon={faUserCircle}
              className='text-3xl cursor-pointer hover:text-gray'
              onClick={() => setDropdown((oldDropdown) => !oldDropdown)}
            />
            {dropDown && <Dropdown setDropdown={setDropdown} />
            }
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavBar;
