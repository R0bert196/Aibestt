import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { x } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import state from "../../state";
import { useAtom } from "jotai";

function ToggleSidebarButton() {
  
  // const [activeSidebar, setActiveSidebar] = useState(false);
  const [activeSidebar, setActiveSidebar] = useAtom(state.activeSidebar);

  return (
      <div className="text-center">
          <button className="hover:brightness-125 transition-all duration-200" onClick={() => setActiveSidebar(prevActiveSidebar => !prevActiveSidebar)}>{activeSidebar ? <FontAwesomeIcon className='text-primary text-4xl' icon={faXmark} /> : <FontAwesomeIcon className='text-primary text-3xl' icon={faBars} />}</button>
      </div>
  )
}

export default ToggleSidebarButton;