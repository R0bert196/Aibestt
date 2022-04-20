import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import Dashbord from './pages/Dashbord';

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={<HomePage />} exact />
        <Route path='/dashboard' element={<Dashbord />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>

    </Router>
  );
}

export default App;
