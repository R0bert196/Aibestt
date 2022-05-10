import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from "jotai";
import state from "../state";
import RegisterSchema from '../validations/RegisterSchema';
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from './TextField';
import Api from '../utilities/Api'
import { toast } from 'react-toastify';


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
          Api.post("register", 
            
                    {"firstName": values.firstName, 
                    "lastName":values.lastName, 
                    "email":values.email, 
                    "password": values.password, 
                    "group": values.group, 
                    "cui": values.cui})
          .then(data => {
            console.log(data)
            toast.success("Registered Succesfully")
            // set it up later as an access token (data.accessToken)
            setToken(data.data.jwtToken)
            navigate("/")
          })
            .catch(error => {
              console.log(error.response.status)
              if (error.response.status == 500) {
                toast.error("invalid cui");
              }
              else {
                toast.error("Invalid Credentials")
              }
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
              <button className="py-4 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl" type="submit">Register</button>
            </div>
          </Form>
        }}
    </Formik>
    </>
  )
}

export default RegisterForm