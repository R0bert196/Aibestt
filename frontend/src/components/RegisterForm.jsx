import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from "jotai";
import state from "../state";


function RegisterForm() {
  
  const [token, setToken] = useAtom(state.token);

   const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        group: '',
        cui: '',
    })

    let navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
          setToken(data.accessToken)
          navigate("/")
        })
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

  return (
    <>
    <form onSubmit={e => handleSubmit(e)} className='center-center border-b border-solid'>
        <div>
          <div>
            <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" type="text" defaultValue={formData.firstName} onChange={handleChange}  placeholder="First Name" name="first-name" id="first-name"/>
          </div>
          <div>
            <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" type="text" defaultValue={formData.lastName} onChange={handleChange}  placeholder="Last Name" name="last-name" id="last-name"/>     
          </div>
        </div>
        <div>
          <div>
            <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" name="email" id="email" />
          </div>
        </div>
        <div>
          <div>
            <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" type="password" value={formData.password} onChange={handleChange} placeholder="Password" name="password" id="password" />
          </div>
          <div>
            <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border"  type="password" value={formData.confirm} onChange={handleChange} placeholder="Repeat Password" name="repeat-password" id="repeat-password" />
          </div>
        </div>
        <div>
          <div>
            <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" type="text" defaultValue={formData.group} onChange={handleChange} placeholder="Company Group Name" name="company-group-name" id="company-group-name"/>
          </div>
          <div>
            <input className="w-full py-4 rounded-3xl my-4 px-4 border-solid border" type='text' defaultValue={formData.cui} onChange={handleChange} placeholder="Company CUI" name="company-cui" id="company-cui" />
          </div>
        </div>
        <div>
          <button className="py-2 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl" type="submit">Register</button>
        </div>
      </form>
    </>
  )
}

export default RegisterForm