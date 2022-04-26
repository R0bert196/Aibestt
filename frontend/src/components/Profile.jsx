import avatar from '../images/avatar.png'


function Profile() {
  return (
    <div className='w-full'>
        <h1>My profile</h1>
          <div className="grid grid-cols-2 gap-4 mt-3 ml-5">        
           <div>
             <div className="w-10 min-w-[25%]">
                <img src={avatar} alt="pic"/>
             </div>            
            <div >
              <h4><b>John Doe</b></h4>
              <p>Engineer</p>
            </div>
          </div> 

          <div>
            <h3>Setari cont</h3>
            <form className='flex flex-col gap-2'>
              <label>
                Adresa email:
                <input type="text" name="name" />
              </label>
              <label>
                Parola veche:
                <input type="text" name="name" />
              </label>
              <label>
                Parola noua:
                <input type="text" name="name" />
              </label>
              <label>
                Confirmare parola:
                <input type="text" name="name" />
              </label>            
              <input type="submit" value="Submit" />
            </form>
          </div>

          <div>
            <h3>Detalii de contact</h3>
            <form className='flex flex-col gap-2'>
              <label>
                Adresa:
                <input type="text" name="name" />
              </label>
              <label>
                Oras:
                <input type="text" name="name" />
              </label>              
              <label>
                Judet:
                <input type="text" name="name" />
              </label>
              <label>
                Nr. Telefon:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        </div>
  )
}

export default Profile