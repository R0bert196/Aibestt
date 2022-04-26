import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function ToggleSidebarButton({ activeSidebar, setActiveSidebar}) {
  return (
      <div className="text-center">
          <button style={{ backgroundColor: activeSidebar ? 'rgba(255,255,255,.2)' : '#4e73df', position: 'absolute', left: '20px' }} className="rounded-full py-2 px-4 mt-4 z-10 hover:brightness-125 transition-all duration-300" onClick={() => setActiveSidebar(prevActiveSidebar => !prevActiveSidebar)}>{activeSidebar ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}</button>
      </div>
  )
}

export default ToggleSidebarButton;