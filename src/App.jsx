import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import MainPage from "./pages/mainpage/MainPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import AddJobPage from "./pages/addjob/AddJobPage";
import EditJobPage from "./pages/editjob/EditJobPage";
import ViewDetailPage from "./pages/viewdetails/ViewDetailPage";
import NotFound from "./pages/notfound/Notfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home/addjob' element={<ProtectedRoute><AddJobPage /></ProtectedRoute>} />
        <Route path='/home/editjob/:id' element={<ProtectedRoute><EditJobPage /></ProtectedRoute>} />
        <Route path='/home/viewdetails/:id' element={<ViewDetailPage />} />
        {/* Catch all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
