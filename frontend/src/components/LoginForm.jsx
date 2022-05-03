import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../state";
import LoginSchema from "../validations/LoginSchema";
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from './TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from "../utilities/Api";


function LoginForm() {
    const [token, setToken] = useAtom(state.token);

    let navigate = useNavigate();

    return <Formik
        initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={values => {
           Api.post("login", 
               {
                   "username": values.email,
                   "password": values.password

            })
                .then(data => {
                    //todo change data.data to data.accessToken
                    setToken(data.data.jwtToken)
                    console.log(data.data.jwtToken)
                    toast.success("You are now logged in!")
                    navigate("/")
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
}

export default LoginForm;
