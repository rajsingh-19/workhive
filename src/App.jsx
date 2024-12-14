import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import ViewDetailPage from './pages/ViewDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<MainPage />} />
        <Route path='/home/addjob' element={<AddJobPage />} />
        <Route path='/home/editjob/:id' element={<EditJobPage />} />
        <Route path='/home/viewdetails/:id' element={<ViewDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
