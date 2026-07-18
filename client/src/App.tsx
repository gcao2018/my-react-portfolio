import { BrowserRouter, Route, Routes } from 'react-router';
import Resume from './components/about/Resume';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/tradier-dashboard/Dashboard';
import Login from './components/login/Login';
import { authService } from './api/auth-service';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return <div className='my-app'>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/login' element={<Login authService={authService} />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
};