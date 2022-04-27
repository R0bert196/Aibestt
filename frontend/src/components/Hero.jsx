import landingImage from '../images/landingImage.jpg';
import { Link } from 'react-router-dom';


function Hero() {
  return (
      <div className='h-screen'>
          <div style={{ backgroundImage: `url(${landingImage})` }} className='h-4/6 clip-path text-secondary bg-no-repeat bg-cover'>
            <div className='mx-4 lg:mx-8 flex justify-between pt-4'>
              <h1 className='text-3xl text-primary'> <Link to='/' className='hover:brightness-125'>AIBEST</Link></h1>
              <ul className='flex gap-3'>
                <li><Link style={{ border: '0.5px solid gray' }} className='py-2 px-2 bg-transparent w-28 inline-block hover:bg-primary rounded-br-xl text-center' to='/login'>Sign In</Link></li>
                <li><Link className='py-2 px-2 bg-accent w-28 inline-block hover:brightness-200 rounded-br-xl text-center' to='/register'>Get Started</Link></li>
              </ul>
            </div>
              <div className='flex flex-col h-4/6 justify-center align-center w-6/12 mx-auto'>
                  <p className='text-left mb-4' >Lorem ipsum dolor, sit amet consectetur adipisicing elit. A repellendus natus unde molestias doloribus esse delectus ea non nesciunt temporibus?</p>
                  <Link className='py-2 px-2 bg-accent w-28 inline-block hover:brightness-200 rounded-br-xl text-center' to='/register'>Get Started</Link>
              </div>
          </div>
    </div>
  )
}

export default Hero