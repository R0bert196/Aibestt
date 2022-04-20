function SideBar() {
  return (
    <nav className="px-16 bg-primary text-white ">
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
          <div className="text-center">
              <button style={{ backgroundColor: 'rgba(255,255,255,.2)' }} className="rounded-full py-2 px-4 mt-4">{ '<' }</button>
          </div>
    </nav>
  )
}

export default SideBar