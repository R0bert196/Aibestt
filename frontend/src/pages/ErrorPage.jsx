import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
      <div>
          <h1>Error</h1>
          <h2><Link to='/'>Home Page</Link></h2>
      </div>
  )
}

export default ErrorPage