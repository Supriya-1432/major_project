import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from '././pages/Home/Home'
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Authentication/Login/Login';
import Register from './pages/Authentication/Register/Register';
import Upload from './pages/Upload/Upload';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar />} >
        <Route index element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </>
  );
}

export default App;
