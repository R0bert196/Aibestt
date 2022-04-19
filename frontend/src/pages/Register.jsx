import RegisterForm from "../components/RegisterForm";
import { Link } from 'react-router-dom';


function Register() {
  return (
      <>
      <h1>Create an Account!</h1>
      <RegisterForm />
      <>
        <div>
          <Link to='/login'>Already have an account? Login!</Link>
        </div>
        <div>
          <Link to='/'>Home Page</Link>
        </div>
      </>
      </>
  )
}

export default Register