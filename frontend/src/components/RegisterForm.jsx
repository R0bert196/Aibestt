import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from "jotai";
import state from "../state";
import RegisterSchema from '../validations/RegisterSchema';
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from './TextField';


function RegisterForm() {
  
  const [token, setToken] = useAtom(state.token);
    let navigate = useNavigate()


  return (
    <>
      
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          group: '',
          cui: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={values => {
          console.log(values)
          fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(values.firstName, values.lastName, values.email, values.password, values.group, values.cui)
        })
              .then(res => res.json())
              .then(data => {
                setToken(data.accessToken)
                navigate("/")
              })
        }}
      >
        {formik => {
          // console.log(formik.values);
          return <Form className='center-center border-b border-solid'>
            <div>
              <div>
                <TextField label='First Name' name='firstName' type='text'/>
              </div>
              <div>
                <TextField label='Last Name' name='lastName' type='text' />
              </div>
            </div>
            <div>
              <div>
                <TextField label='Email' name='email' type='email' />
              </div>
            </div>
            <div>
              <div>
                <TextField label='Password' name='password' type='password' />
              </div>
              <div>
                <TextField label='Confirm Password' name='confirmPassword' type='password' />
              </div>
            </div>
            <div>
              <div>
                <TextField label='Company Group' name='group' type='text' />
              </div>
              <div>
                <TextField label='Company Cui' name='cui' type='text' />
              </div>
            </div>
            <div>
              <button className="py-2 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl" type="submit">Register</button>
            </div>
          </Form>
         
     
        }}
    </Formik>
    </>
  )
}

export default RegisterForm