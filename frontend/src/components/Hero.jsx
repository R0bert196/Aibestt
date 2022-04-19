import landingImage from '../images/landingImage.jpeg';


function Hero() {
  return (
      <div className='h-screen'>
          <div style={{ backgroundImage: `url(${landingImage})` }} className='h-4/6 clip-path'>
          </div>
          <div>

          </div>
    </div>
  )
}

export default Hero