import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import { ToastContainer, toast } from 'react-toastify';
import DashOrHome from './pages/DashOrHome';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    return sessionStorage.getItem('token');
}

function handleLogout(){
  sessionStorage.clear()
}

function App() {
  return (
    <>
    <Router>
      <Routes>       
        <Route path='/' element={<DashOrHome getToken={getToken} setLogout={handleLogout}/>} exact />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/register' element={<Register setToken={setToken}/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
    <ToastContainer />
     </>
    
  );
}

export default App;
