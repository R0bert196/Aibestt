import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Employees from './components/Employees';
import Profile from './components/Profile';
import ErrorPage from './pages/ErrorPage';
import { ToastContainer, toast } from 'react-toastify';
import DashOrHome from './pages/DashOrHome';
import MainDashPage from './components/MainDashPage';
import Footer from './components/Footer';


function App() {
  return (
    <>
    <Router>
      <Routes>       
        <Route path='/' element={<DashOrHome component={<MainDashPage />} />} exact/>
        <Route path='/profile' element={<DashOrHome component={<Profile />}/>} exact/>
        <Route path='/employees' element={<DashOrHome component={<Employees />} />} exact/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
      <ToastContainer />
      <Footer />
     </>
    
  );
}

export default App;
