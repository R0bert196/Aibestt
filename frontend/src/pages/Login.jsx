import LoginForm from '../components/LoginForm'
import RegisterSection from '../components/RegisterSection'

function Login() {
    return (
      <div className='container mx-auto px-16'>
        <div className='bg'>
          <h1>Welcome Back</h1>
          <LoginForm />
          <RegisterSection />
        </div>
      </div>
      
  )
}

export default Login