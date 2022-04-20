import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';

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
    <Router>

      <Routes>
        {
        getToken() ? 
          <Route path='/' element={<Dashboard getToken={getToken} setLogout={handleLogout}/>} exact /> : 
            <Route path='/' element={<HomePage />} exact />                
        }
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/register' element={<Register setToken={setToken}/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>

    </Router>
  );
}

export default App;
