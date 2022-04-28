import avatar from '../images/avatar.png'


function Profile() {
  return (
    <div className='w-full'>
        <h1>My profile</h1>
          <div className="grid grid-cols-2 gap-4 mt-3 ml-5">        
           <div className='flex flex-col items-center'>
              <div className="w-10 min-w-[25%] ">
                <img src={avatar} alt="pic"/>
              </div>            
              <div >
                <h4><b>John Doe</b></h4>
                <p>Engineer</p>
              </div>
          </div>

          <div className='flex flex-col justify'>
            <h3 className='mb-3'>Setari cont</h3>
            <form className='grid grid-cols-3 gap-4' > 
              <label htmlFor="email">Adresa email</label>
                <input type="text" name="email" className='col-span-2' />
              
              <label htmlFor="old-pw">Parola veche</label>
                <input type="text" name="old-pw" className='col-span-2' />
              
              <label htmlFor="password">Parola noua</label>
                <input type="text" name="password" className='col-span-2' />
              
              <label htmlFor="confirm">Confirmare parola</label> 
              <input type="text" name="confirm" className='col-span-2' />
              
              <input type="submit" value="Submit" className='col-span-full py-4 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl' />
            </form>
          </div>

          <div>
            <h3>Detalii de contact</h3>
            <form className='grid grid-cols-3 gap-4'>
              <label htmlFor="address">Adresa</label>                
              <input type="text" name="address" className='col-span-2' /> 

              <label htmlFor="city">Oras</label>  
              <input type="text" name="city" className='col-span-2' /> 

              <label htmlFor="county">Judet</label>
              <input type="text" name="county" className='col-span-2' />  
                          
              <label htmlFor="phone">Nr. Telefon</label>
              <input type="text" name="phone" className='col-span-2' />
              
              <input type="submit" value="Submit" className='col-span-full py-4 bg-primary text-white hover:brightness-125 w-full px-4 my-4 rounded-3xl' />
            </form>
          </div>
        </div>
      </div>
  )
}

export default Profile