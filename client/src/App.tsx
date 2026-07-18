import { BrowserRouter, Route, Routes } from 'react-router';
import Resume from './components/about/Resume';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/tradier-dashboard/Dashboard';
import Login from './components/login/Login';
import { signinService } from './api/signin-service';

export default function App() {
  return <div className='my-app'>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login signinService={signinService} />} />
      </Routes>
    </BrowserRouter>
  </div>
};