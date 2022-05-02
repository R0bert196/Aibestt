import avatar from '../images/avatar.png'


function Profile() {
  return (
    <div className='w-full'>
        <h1 className='mt-3 text-xl'>My profile</h1>
          <div className="grid grid-cols-8 mt-3 ml-5 gap-3">        
           <div style={{ border: "1px solid #e3e6f0" }} 
                  className='flex flex-col items-center col-start-1 col-end-5 bg-white px-2 rounded'>
              <div className="w-10 min-w-[25%] ">
                <img src={avatar} alt="pic"/>
              </div>            
              <div >
                <h4><b>John Doe</b></h4>
                <p>Engineer</p>
              </div>
            </div>

            <div style={{ border: "1px solid #e3e6f0" }} 
                  className='flex flex-col justify col-start-5 col-end-9 bg-white px-2 rounded'>
              <h3 className='mb-3 text-center'>Setari cont</h3>
              <form className='grid grid-cols-4 gap-4' > 
                <label htmlFor="email">Adresa email</label>
                  <input type="text" name="email" className='col-span-3' style={{ border: "1px solid #e3e6f0" }}/>
                
                <label htmlFor="old-pw">Parola veche</label>
                  <input type="text" name="old-pw" className='col-span-3' style={{ border: "1px solid #e3e6f0" }}/>
                
                <label htmlFor="password">Parola noua</label>
                  <input type="text" name="password" className='col-span-3' style={{ border: "1px solid #e3e6f0" }}/>
                
                <label htmlFor="confirm">Confirmare parola</label> 
                <input type="text" name="confirm" className='col-span-3' style={{ border: "1px solid #e3e6f0" }}/>
                
                <input type="submit" value="Submit" className='col-span-full py-4 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl' />
              </form>
            </div>

            <div style={{ border: "1px solid #e3e6f0" }} className="my-[2rem] col-start-2 col-end-7 bg-white px-2 rounded">
              <h3 className='mb-3 text-center'>Detalii de contact</h3>
              <form className='grid grid-cols-4 gap-4'>
                <label htmlFor="address">Adresa</label>                
                <input type="text" name="address" className='col-span-3' style={{ border: "1px solid #e3e6f0" }}/> 

                <label htmlFor="city">Oras</label>  
                <input type="text" name="city" className='col-span-3' style={{ border: "1px solid #e3e6f0" }}/> 

                <label htmlFor="county">Judet</label>
                <input type="text" name="county" className='col-span-3' style={{ border: "1px solid #e3e6f0" }}/>  
                            
                <label htmlFor="phone">Nr. Telefon</label>
                <input type="text" name="phone" className='col-span-3' style={{ border: "1px solid #e3e6f0" }}/>
                
                <input type="submit" value="Submit" className='col-span-full py-4 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl' />
              </form>
            </div>
          </div>
      </div>
  )
}

export default Profile