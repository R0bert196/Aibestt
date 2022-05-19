import { useState } from "react";
import avatar from "../images/avatar.png";
import GraphHeader from "./GraphHeader";

function Profile() {


  const [fullName, setFullName] = useState("John Doe");

  

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
            <form>
              <div className='px-8'>
                <div className='flex gap-2 justify-between'>
                  <div className=''>
                    <label className='block' htmlFor='email'>
                      Email Address
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
                      Old Password
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
                      New Password
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
                      Confirm New Password
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
