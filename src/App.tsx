import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Resume from './components/about/Resume';
import Home from './components/home/Home';
import Navbar from './components/navbar/NavBar';

export default function App() {
  return <div className='my-app'>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/resume' element={<Resume />} />
      </Routes>
    </BrowserRouter>
  </div>
};