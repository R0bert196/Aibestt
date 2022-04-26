import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

function HomePage() {
  return (
      <>
        <Hero />

        <div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/register'>Register</Link>
            </div>
        </div>
    
      </>
  )
}

export default HomePage