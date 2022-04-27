import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import LandingStatsCard from '../components/LandingStatsCard';

function HomePage() {
  return (
      <div className='bg-secondary'>
        <Hero />
        <LandingStatsCard />
    
      </div>
  )
}

export default HomePage