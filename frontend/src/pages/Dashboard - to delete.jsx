import React from 'react'
import { useNavigate } from 'react-router-dom';


function Dashboard({getToken, setLogout}) {

  const navigate = useNavigate()

  return (
    <div>
        <div>dashboard</div>
        <button onClick={() => {
          setLogout();
          navigate("/")
          navigate(0)
        }
          }>Logout</button>
    </div>
  )
}

export default Dashboard