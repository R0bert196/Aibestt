import EmployeeGraph from '../components/EmployeeGraph'
import IndiactorCard from '../components/IndicatorCard'

function Dashbord() {
    return (
        <div className='container mx-auto px-4 max-w-5xl overflow-hidden min-w-fit'>
            <div>
            <h1>Dashboard</h1>
        </div>
        <div className='flex flex-wrap'>
            <IndiactorCard />
            <IndiactorCard />
            <IndiactorCard />
            <IndiactorCard />
        </div>
        <div>
              <EmployeeGraph />  
        </div>
      </div>
    
  )
}

export default Dashbord