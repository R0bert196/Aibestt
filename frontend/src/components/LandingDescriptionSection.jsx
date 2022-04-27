import photo from '../images/mailPhoto.png'


function LandingDescriptionSection() {
  return (
    <div className="grid gap-10 grid-cols-3 px-10 py-6 my-10 bg-white text-gray">
          <div className="flex flex-col col-start-1 col-end-3">
            <div className="basis-4/6">
                <div className='px-6'>
                    <img src={photo} className='object-cover' alt="Mail Photo" />
                </div>  
                <div className='bg-secondary p-6 rounded-br-xl'>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit possimus at nam aliquam cupiditate laboriosam eius neque ut molestias eligendi.</p> 
                </div>
            </div>
          </div>
          <div>
            <div className='text-3xl rounded-br-xl bg-secondary p-6 font-light'>
               <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse placeat dolore nemo consequuntur, cumque doloremque eum voluptatum repellat maxime neque laboriosam obcaecati inventore eveniet dicta quisquam consectetur, iure error facilis.</p>   
            </div>
          </div>
    </div>
  )
}

export default LandingDescriptionSection