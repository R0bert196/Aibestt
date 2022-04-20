import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function IndicatorCard() {
  return (
      <div style={{ border: '1px solid #e3e6f0' }} className='bg-white m-6 py-5 px-3 rounded-lg flex justify-center align-center font-bold'>
          <div>
              <div className='flex-1 w-9/12 mr-2 mb-2 text-primary text-xs'>
                    <span>Average Employee salary</span>
              </div>
              <div className='font-bold text-lg'>
                    <span>3.442</span>
              </div>
          </div>
          <div className='mt-6'>
              {/* <FontAwesomeIcon icon="fa-user" />  */}
              {/* <FontAwesomeIcon icon={["fal", "user"]} /> */}
              {/* <FontAwesomeIcon icon={["fal", "coffee"]} /> */}
              {/* <FontAwesomeIcon icon={["fas", "coffee"]} /> */}
              icon
          </div>
    </div>
  )
}

export default IndicatorCard