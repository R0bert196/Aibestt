import RegisterForm from "../components/RegisterForm";
import { Link } from 'react-router-dom';


function Register({setToken}) {
  return (
      <div className="px-16 py-2 bg-white rounded  w-3/5 mx-auto my-16">
        <h1 className="text-center">Create an Account!</h1>
        <RegisterForm setToken={setToken}/>
        <div className="flex flex-col justify-end">
          <div className="inline-block self-end mt-2 pd-2 hover:text-primary">
            <Link to='/login'>Already have an account? Login!</Link>
          </div>
          <div className="inline-block self-end mt-2 pd-2 hover:text-primary">
            <Link to='/'>Home Page</Link>
          </div>
        </div>
      </div>
  )
}

export default Register