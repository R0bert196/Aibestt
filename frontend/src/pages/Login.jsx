import LoginForm from '../components/LoginForm'
import RegisterSection from '../components/RegisterSection'
import LoginImage from '../components/LoginImage'

function Login() {
  return (
    <div className='container mx-auto px-16 flex max-h-screen'>
      <div className='w-2/4 my-16 overflow-hidden mw1024:hidden'>
        <LoginImage />
      </div>
      <div className='px-16 py-2 bg-white rounded  w-3/5 mx-auto my-16'>
        <h1 className='text-center my-6 font-bold text-xl'>Welcome Back!</h1>
        <LoginForm />
        <RegisterSection />
      </div>
    </div>

  )
}

export default Login