import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function NavBar() {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");

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
    <section className='absolute py-3 bg-white shadow inset-x-0'>
      <nav className='flex justify-end container'>
        <ul className='flex gap-2 mr-4'>
          <li>
            <h3 className="text-xl">{company}</h3>
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
          <li className="mr-4">
            <h3 className="text-xl">{username}</h3>
          </li>
          <li>
            <FontAwesomeIcon
              // style={{ color: "#dddfeb" }}
              icon={faUserCircle}
              className='text-3xl'
            />
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavBar;
