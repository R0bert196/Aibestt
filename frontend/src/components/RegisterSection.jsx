import { Link } from 'react-router-dom';

function RegisterSection() {
  return (
      <div className='text-center'>
        <div>
          {/* <a href="#">Forgot Password?</a> */}
        </div>
      <div className='my-2'>
        <Link className='' to='/register'>Create an Account!</Link>
        </div>
      <div className='my-2'>
        <Link className='' to='/'>Back</Link>
        </div>
      </div>
  )
}

export default RegisterSection