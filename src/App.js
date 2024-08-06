import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Routes,Route } from 'react-router-dom';
import VerifyOtp from './components/VerifyOtp';
import { Connections } from './components/Connections';
import Chat from './components/Chat';
import Home from './components/Home';
import io from 'socket.io-client';
import UserDetails from './components/UserDetails';
import EditUserDetailsForm from './components/EditUserDetailsForm';
import { useSelector } from 'react-redux';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
function App() {
  
  const nightmode = useSelector(state => state.User.nightmode);
  // document.body.style.color  = 'white';
  // document.body.style.backgroundColor  = 'Black';
  
  const socketInstance = io('https://chatsapp-server-5.onrender.com');
  return ( <div className={` custom-scrollbar  ${nightmode ? "bg-gray-900  text-white":" bg-gray-100 text-gray-900"}`}
       
    // style={{ backgroundImage: 'url(https://wallpapercave.com/wp/wp9764093.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    // style={{ backgroundImage: 'url(https://i0.wp.com/demishia.com/wp-content/uploads/2018/04/admin-login-background-images-8.jpg?resize=768%2C432&ssl=1)', backgroundSize: 'cover', backgroundPosition: 'center' }}
     >
    <Routes>
      <Route path='Signup' element= {<Signup/>}/>
      <Route path='VerifyOtp' element= {<VerifyOtp/>}/>
      <Route path='*' element= {<Login/>}/>
      <Route path='Login' element= {<Login/>}/>
      <Route path='Connections' element= {<Connections/>}/>
      {/* <Route path='Connections' element= {<Connections/>}/> */}
      <Route path='Chat' element= {<Chat socket={socketInstance}/>}/>
      <Route path='UserDetails' element= {<UserDetails/>}/>
      <Route path='Home' element= {<Home/>}/>
      
      <Route path='UserDetails/edit' element= {<EditUserDetailsForm/>}/>
      <Route path='ForgotPassword' element= {<ForgotPassword/>}/>
      <Route path='ResetPassword' element= {<ResetPassword/>}/>
    </Routes>

    </div>
  );
}

export default App;
