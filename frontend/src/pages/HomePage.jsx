import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import LandingDescriptionSection from '../components/LandingDescriptionSection';
import LandingStatsCard from '../components/LandingStatsCard';

function HomePage() {
  return (
      <div className='bg-secondary'>
        <Hero />
        <LandingStatsCard />
        <LandingDescriptionSection />
      </div>
  )
}

export default HomePage