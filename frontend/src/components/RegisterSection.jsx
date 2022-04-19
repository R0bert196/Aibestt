import { Link } from 'react-router-dom';

function RegisterSection() {
  return (
      <>
        <div>
          <a href="#">Forgot Password?</a>
        </div>
        <div>
          <Link to='/register'>Create an Account!</Link>
        </div>
        <div>
          <Link to='/'>Back</Link>
        </div>
      </>
  )
}

export default RegisterSection