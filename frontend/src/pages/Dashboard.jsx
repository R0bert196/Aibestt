import { useNavigate } from 'react-router-dom';

import DoughnutGraph from '../components/DoughnutGraph'
import EmployeeGraph from '../components/EmployeeGraph'
import IndiactorCard from '../components/IndicatorCard'



function Dashbord({ getToken, setLogout }) {
    
    const navigate = useNavigate()

    

    return (
        <div className='container mx-auto px-4 max-w-5xl overflow-hidden min-w-fit'>
            <div className='text-gray-900 text-3xl mt-8'>
                <h1>Dashboard</h1>
            </div>
            <div className='flex flex-wrap'>
                <IndiactorCard />
                <IndiactorCard />
                <IndiactorCard />
                <IndiactorCard />
            </div>
            <div className='flex'> 
                <DoughnutGraph />
                <DoughnutGraph />
            </div>
            <div className='my-8'>
                <EmployeeGraph />
            </div>

            <button className='py-2 bg-accent text-white hover:brightness-200 px-4 my-4 rounded-3xl' onClick={() => {
                setLogout();
                navigate("/")
                navigate(0)
            }
                }>Logout</button>
      </div>
    
  )
}

export default Dashbord