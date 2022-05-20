import { useState, useEffect } from "react";
import avatar from "../images/avatar.png";
import GraphHeader from "./GraphHeader";
import { Formik, Form, ErrorMessage } from "formik";
import EditCredentialsSchema from "../validations/EditCredentialsSchema";
import { toast } from "react-toastify";
import TextField from "./common/TextField";
import Api from "../utilities/Api";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function Profile() {

  const axiosPrivate = useAxiosPrivate();

  
  const [fullName, setFullName] = useState("");

  const getData = async () => {
    const controller = new AbortController();
    try {
      await Promise.all([
        axiosPrivate.get(`getFullName`, {
          signal: controller.signal,
        }),
      ]).then((response) => {
        setFullName(response[0].data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container mx-4 my-14 px-5 w-full mt-16 overflow-hidden'>
      <div className='mb-4 text-3xl'>
        <h1>Profile</h1>
      </div>
      <div className='grid grid-cols-8  mt-3 ml-5 gap-3'>
        <div
          style={{ border: "1px solid #e3e6f0" }}
          className='flex flex-col items-center justify-center col-start-1 col-end-4 px-2 rounded-md'
        >
          <div className='w-10 min-w-[25%] '>
            <img src={avatar} alt='pic' className='rounded-full' />
          </div>
          <div>
            <h4 className='font-bold'>{fullName}</h4>
          </div>
        </div>

        <div className='flex flex-col justify col-start-5 col-end-9 px-2 rounded'>
          <GraphHeader title={"Account Setting"} />
          <div
            style={{
              borderBottom: "1px solid #e3e6f0",
              borderLeft: "1px solid #e3e6f0",
              borderRight: "1px solid #e3e6f0",
            }}
            className='p-2 rounded-b-md'
          >
            <Formik
              initialValues={{
                email: "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={EditCredentialsSchema}
              onSubmit={(values) => {
                axiosPrivate
                  .post(
                    "updateAccountCredentials",

                    {
                      email: values.email,
                      oldPassword: values.oldPassword,
                      newPassword: values.newPassword,
                    }
                  )
                  .then((data) => {
                    console.log(data);
                    toast.success("Changes Saved!");
                    // set it up later as an access token (data.accessToken)
                  })
                  .catch((error) => {
                    console.log(error.response.status);
                    toast.error("Wrong Old Password");
                  });
              }}
            >
              {(formik) => {
                return (
                  <Form className='center-center px-2'>
                    <div className='flex justify-between'>
                      <div>
                        <TextField label='Email' name='email' type='email' />
                      </div>
                      <div>
                        <TextField
                          label='Old Password'
                          name='oldPassword'
                          type='password'
                        />
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div>
                        <TextField
                          label='New Password'
                          name='newPassword'
                          type='password'
                        />
                      </div>
                      <div>
                        <TextField
                          label='Confirm Password'
                          name='confirmPassword'
                          type='password'
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        className='py-4 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl'
                        type='submit'
                      >
                        Save Changes
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>

        <div className='my-[2rem] col-start-2 col-end-8  px-2 rounded'>
          <GraphHeader title={"Contact Details"} />
          <div
            style={{
              borderBottom: "1px solid #e3e6f0",
              borderLeft: "1px solid #e3e6f0",
              borderRight: "1px solid #e3e6f0",
            }}
            className='p-2 rounded-b-md'
          >
            <form>
              <div className='px-8'>
                <div className='flex gap-2 justify-between'>
                  <div className=''>
                    <label className='block' htmlFor='email'>
                      Address
                    </label>
                    <input
                      type='text'
                      name='email'
                      className='py-2 px-4 rounded-3xl'
                      style={{ border: "1px solid #e3e6f0" }}
                    />
                  </div>

                  <div className=''>
                    <label className='block' htmlFor='old-pw'>
                      City
                    </label>
                    <input
                      type='text'
                      name='old-pw'
                      className='py-2 px-4 rounded-3xl'
                      style={{ border: "1px solid #e3e6f0" }}
                    />
                  </div>
                </div>
                <div className='flex gap-2 justify-between'>
                  <div className=''>
                    <label className='block' htmlFor='password'>
                      County
                    </label>
                    <input
                      type='text'
                      name='password'
                      className='py-2 px-4 rounded-3xl'
                      style={{ border: "1px solid #e3e6f0" }}
                    />
                  </div>

                  <div>
                    <label className='block' htmlFor='confirm'>
                      Phone Number
                    </label>
                    <input
                      type='text'
                      name='confirm'
                      className='py-2 px-4 rounded-3xl'
                      style={{ border: "1px solid #e3e6f0" }}
                    />
                  </div>
                </div>
                <input
                  type='submit'
                  value='Save Changes'
                  className=' py-2 px-4 bg-primary text-white hover:brightness-125 w-max my-4 rounded-3xl'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
