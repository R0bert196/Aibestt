import React from 'react'
import { useState } from 'react';
import AutoCompleteBox from "./AutoCompleteBox";
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from './TextField';
import Api from '../utilities/Api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CompanyRegistrationSchema from "../validations/CompanyRegistrationSchema"

function AddNewCompany({toggleUpload}) {

  const [isSelectedField, setIsSelectedField] = useState(false);

  return (
    <div
      className='p-4 transition-all duration-300'
      style={{
        opacity: toggleUpload ? "1000" : "0",
        position: "relative",
        top: toggleUpload ? "0px" : "-5px",
      }}
    >
      <div className='md:grid grid-cols-3 gap-6'>
        
        

<Formik
        initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={CompanyRegistrationSchema}
        onSubmit={values => {
           Api.post("login", 
               {
                   "username": values.email,
                   "password": values.password

            })
                .then(data => {
                    //todo change data.data to data.accessToken

                    console.log(data.data.jwtToken)
                    toast.success("You are now logged in!")

                })
                .catch(err => {
                    if (err) {
                        toast.error("Bad Credentials!")
                    }
                })
        }}
    >

        {formik => {
           return <Form
                className="center-center border-b border-solid">
                <div>
                    <TextField label='Enter Email Address...' name='email' type='email' />
                </div>
                <div>
                    <TextField label='Password' name='password' type='password' />
                </div>
                <div className="flex gap-2 mt-4">
                    <TextField label='Remember Me' name='rememberMe' type='checkbox' />
                    <label className="" htmlFor="rememberMe">
                        Remember Me
                    </label>
                </div>
                <div>
                    <button
                        className="py-4 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl"
                        type="submit">
                        Login
                    </button>
                </div>
            </Form>
        }}
    </Formik>




      </div>
    </div>
  )
}

export default AddNewCompany