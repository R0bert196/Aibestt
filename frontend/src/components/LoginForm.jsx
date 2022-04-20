import {useState} from 'react'
import { useNavigate } from 'react-router-dom'


function LoginForm({setToken}) {
 const [formData, setFormData] = useState({
        email: '', // required
        password: '' // required
    })

    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setToken(data.accessToken)
            navigate("/")
            navigate(0)
        })
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }


  return (
    <div>
      <form onSubmit={e => handleSubmit(e)} className='center-center border-b border-solid'>
        <div>
          <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" defaultValue={formData.email} onChange={e => handleChange(e)} type="email" placeholder="Enter Email Address..." name="email" id="password" />
        </div>
        <div>
          <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" value={formData.password} onChange={e => handleChange(e)} type="password" placeholder="Password" name="password" id="password" />
        </div>
        <div>
          <input className="" type="checkbox" name="rememebr-me" id="remember-me" />
          <label className="mx-4" htmlFor="remember-me">Remember Me</label>
        </div>
        <div>
          <button className="py-2 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl" type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm