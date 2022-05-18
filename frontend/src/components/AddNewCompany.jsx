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
        <div className='md:grid'>        
        

<Formik
        initialValues={{
            cui: '',
            caen: '',
            codPostal: '',
            deni: '',
        }}

        validationSchema={CompanyRegistrationSchema}
        onSubmit={values => {
            console.log(values)
           axiosPrivate
             .post(
               "addCompany",
                {
                 cui: values.cui
               },
               {
                 signal: controller.signal,
               }
             )

             .then((data) => {
               toast.success("Company added");
             })
             .catch((err) => {
               if (err) {
                 toast.error("Please check the information provided");
               }
             });
        }}
    >

        {formik => {
            return <Form
                    className="border-b border-solid gap-4">
                    <div>
                        <TextField label='CUI' name='cui' type='text' />
                    </div>                   
                    <div className='w-max mx-auto my-4'>
                        <button
                            className="py-3 bg-primary text-white hover:brightness-125 px-4 rounded-3xl"
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