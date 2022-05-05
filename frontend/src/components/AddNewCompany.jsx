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

    let navigate = useNavigate();       
    const [isSelectedField, setIsSelectedField] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
    return (
        <div
        className='p-4 transition-all duration-300'
        style={{
            opacity: toggleUpload ? "1000" : "0",
            position: "relative",
            top: toggleUpload ? "0px" : "-1000px",
        }}
        >
        <div className='md:grid grid-cols-3 gap-6'>        
        

<Formik
        initialValues={{
            cui: '',
            caen: '',
            codPostal: '',
            deni: '',
        }}

        validationSchema={CompanyRegistrationSchema}
        onSubmit={values => {
           axiosPrivate.post("addCompany", 
           {
                "deni": values.deni,
                "cui": values.cui,
                "codPostal": values.cui,
                "caen": values.caen
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
                    className="ml-12 grid grid-cols-7 center-center border-b border-solid w-screen gap-4">
                    <div className='col-span-3'>
                        <TextField label='DENI' name='deni' type='text' />
                    </div>
                    <div className='col-span-3'>
                        <TextField label='CUI' name='cui' type='number' />
                    </div>
                    <div className='col-span-3'>
                        <TextField label='CAEN' name='caen' type='number' />
                    </div>
                    <div className='col-span-3'>
                        <TextField label='Cod Postal' name='codPostal' type='number' />
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