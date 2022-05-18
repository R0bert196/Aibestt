import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Employees from './components/Employees';
import Profile from './components/Profile';
import ErrorPage from './pages/ErrorPage';
import { ToastContainer, toast } from 'react-toastify';
import DashOrHome from './pages/DashOrHome';
import MainDashPage from './components/MainDashPage';
import Footer from './components/common/Footer';
import Companies from './components/Companies';
import NavBar from './components/common/NavBar';
import GroupProfile from './components/GroupProfile';


function App() {
  return (
    <div className='font-nunito'>
      <Router>
      <Routes>       
        <Route path='/' element={<DashOrHome component={<Companies />} />} exact/>
        <Route path='/profile' element={<DashOrHome component={<Profile />}/>} exact/>
        <Route path='/employees' element={<DashOrHome component={<Employees />} />} exact/>
        <Route path='/companies/:id' element={<DashOrHome component={< MainDashPage/>} />} exact/>
        <Route path='/group' element={<DashOrHome component={<GroupProfile />} />} exact/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='*' element={<ErrorPage />} />
        </Routes>
    </Router>
      <ToastContainer />
      <Footer />
     </div>
    
  );
}

export default App;
