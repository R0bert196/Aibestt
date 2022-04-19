import landingImage from '../images/landingImage.jpg';
import { Link } from 'react-router-dom';


function Hero() {
  return (
      <div className='h-screen'>
          <div style={{ backgroundImage: `url(${landingImage})` }} className='h-4/6 clip-path text-secondary bg-no-repeat bg-cover'>
                
              <div className='flex flex-col h-4/6 justify-center align-center w-6/12 mx-auto'>
                  <p className='text-left mb-4' >Lorem ipsum dolor, sit amet consectetur adipisicing elit. A repellendus natus unde molestias doloribus esse delectus ea non nesciunt temporibus?</p>
                  <Link className='py-2 px-4 bg-accent w-1/5  inline-block hover:brightness-200 rounded-3xl text-center' to='/register'>Get Started</Link>
              </div>
          </div>
    </div>
  )
}

export default Hero