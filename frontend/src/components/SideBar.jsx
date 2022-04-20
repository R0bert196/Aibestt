function SideBar({ isActive, setIsActive }) {




  return (
      <nav style={{ left: isActive ? '0' : '-100%', position: isActive ? 'relative' : 'fixed' }} className="px-16 bg-primary text-white relative transition-all duration-300">
          <div className="font-bold py-6 px-4 align-center text-center">
             <a href="#">HOME</a> 
          </div>
          <ul style={{ color: 'rgba(255,255,255,.8)', left: '-50px' }} className="relative">
              <li className="py-4">
                  <a className="hover:text-white" href="#">Profile</a>
              </li>
              <li className="py-4">
                  <a className="hover:text-white" href="#">Table</a>
              </li>
              <li className="py-4">
                  <a className="hover:text-white" href="#">Login</a>
              </li>
              <li className="py-4">
                  <a className="hover:text-white" href="#">Register</a>
              </li>
              <li className="py-4">
                  <a className="hover:text-white" href="#">Logout</a>
              </li>
          </ul>
        
    </nav>
  )
}

export default SideBar