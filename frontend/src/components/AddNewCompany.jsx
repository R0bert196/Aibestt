import React from 'react'
import { useState } from 'react';
import AutoCompleteBox from "./AutoCompleteBox";
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from './TextField';
import Api, { axiosPrivate } from '../utilities/Api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CompanyRegistrationSchema from "../validations/CompanyRegistrationSchema"
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function AddNewCompany({toggleUpload}) {

    const [isSelectedField, setIsSelectedField] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
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
            cui: '',
            deni: '',
        }}

        validationSchema={CompanyRegistrationSchema}
        onSubmit={values => {
           axiosPrivate.post("addCompany", 
           {
                   "CUI": values.cui,
                   "DENI": values.deni

            },
           {
                signal: controller.signal
            })
               
                .then(data => {
                    toast.success("Company added")

                })
                .catch(err => {
                    if (err) {
                        toast.error("Please check the information provided")
                    }
                })
        }}
    >

        {formik => {
            return <Form
                    className="grid grid-cols-7 center-center border-b border-solid w-screen gap-4">
                    <div className='col-span-3'>
                        <TextField label='DENI' name='deni' type='text' />
                    </div>
                    <div className='col-span-3'>
                        <TextField label='CUI' name='cui' type='text' />
                    </div>
                    <div className='col-start-3 col-span-2'>
                        <button
                            className="py-4 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl"
                            type="submit">
                            Add company
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