import photo from '../images/loginPhoto.jpg'

function LoginImage() {
  return (
    <img src={photo} className='object-cover' alt="" />
  )
}

export default LoginImage