import { Link } from 'react-router-dom';
import Hero from '../components/loggedout/Hero';
import LandingDescriptionSection from '../components/loggedout/LandingDescriptionSection';
import LandingStatsCard from '../components/loggedout/LandingStatsCard';

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