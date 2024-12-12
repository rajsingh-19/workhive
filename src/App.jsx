import './App.css'
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddJobPage from './pages/AddJobPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/addjob' element={<AddJobPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
