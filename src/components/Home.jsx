import React, { useEffect, useRef, useState } from 'react';
import Chat from './Chat';
import { Connections } from './Connections'; // Corrected import
import io from 'socket.io-client';
import Sidebar from 'react-sidebar';
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IoSettings } from "react-icons/io5";
import { MdModeNight } from "react-icons/md";
import { MdOutlineModeNight } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { setNightmode, setuserdata, setWallpaper } from '../slices/UserDataSlice';
import { apiConnecter } from './services/apiconnecter';
import { BsFillPeopleFill, BsPeople } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Settings from './Settings';
// import { setuserdata } from "../slices/UserDataSlice"; 
const Home = () => {
  var socketInstance = null;
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nightmode = useSelector(state => state.User.nightmode);
  const userdata = useSelector(state => state.User.userdata);
  const [isOpenSettings, setOpenSettings] = useState(false);
  const body = document.body;
  const width = window.innerWidth;

  const formdata = new FormData();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  //  body.style.backgroundColor = 'black';

  async function uploadImage() {
    try {
      const response = await apiConnecter("post", "Profile/UpdateProfile", formdata);
      console.log(response);
      dispatch(setuserdata(response.data.data.user))
    }
    catch (e) {
      console.log(e);
    }
  }
  
  useEffect(async () => {
    socketInstance = await io('https://chatsapp-server-5.onrender.com');
    
    console.log('current socket', socketInstance);
    setSocket(socketInstance);
    console.log('current socket id', socketInstance.id);
    return () => {
      socketInstance.disconnect();
    };
  }, [dispatch,socketInstance]);

  

  
  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };
  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Handle the selected file
    const selectedFile = event.target.files[0];
    formdata.append("Image", event.target.files[0]);
    formdata.append("number", userdata.number);
    uploadImage();
  };
  const toggleNightMode = () => {
    // dispatch({ type: 'TOGGLE_NIGHTMODE' });
  };
  function wallpaperhandler() {
    if (nightmode) {
      dispatch(setWallpaper("https://wallpapercave.com/wp/wp4410779.png"))
      // setBg("https://wallpapercave.com/wp/wp4410779.png");
    }
    else
      //  setBg(("https://wallpapercave.com/dwp2x/wp7130410.jpg"))
      dispatch(setWallpaper("https://wallpapercave.com/dwp2x/wp7130410.jpg"))
  }
  return (
    <Sidebar

      sidebar={
        <div className={` w-[300px] h-screen p-4 ${nightmode ? "bg-[#1a202c]  text-white" : " bg-gray-100 text-gray-900"}`}>
          <button
            className="absolute top-4 right-4"
            onClick={() => onSetSidebarOpen(false)}
          >
          </button>
          <div className='flex flex-col  items-start'>
            <div className='flex rounded-full items-center bg-no-repeat object-cover justify-center overflow-hidden text-white relative' onClick={handleImageClick}>
              <img src={userdata.image} alt='user' className='z-1 w-12 h-12 object-cover cursor-pointer ' />
              <div className=' absolute z-10 '>
                <FaCamera style={{ height: 14, width: 14, color: "black" }} />
              </div>
            </div>
            <h1 className='flex  items-center gap-4  text-lg  w-full py-1 m-1   font-semibold rounded-md'>

              {userdata.name}</h1>

            <div className='flex  items-center gap-4  text-lg    w-full py-1 m-1 font-semibold rounded-md' onClick={() => { wallpaperhandler(); dispatch(setNightmode(!nightmode)) }} >
              {/* <div className='flex items-center justify-center bg-blue-500 rounded-md p-2'>
                {nightmode ? <MdModeNight size={15} color='white' /> : <MdOutlineModeNight size={15} color='white' />}
              </div> */}
              <div className="bg-blue-500 p-[2px] rounded-md">
                <MdModeNight size={22} color="white" className="" />
              </div>
              <button className='mr-12'>Night Mode</button>
              <button
                className={`relative    inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${nightmode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                onClick={toggleNightMode}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${nightmode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
            <div className='flex  items-center gap-4  text-lg  w-full py-1 m-1 font-semibold rounded-md'   >
              <div className="bg-yellow-500 p-[2px] rounded-md">
                <BsFillPeopleFill size={22} backgroundColor="white" color="white" className="" />
              </div>
              <button >New Group</button>
            </div>

{/* 
            <div className='flex  items-center gap-4  text-lg  w-full py-1 m-1  font-semibold rounded-md' onClick={()=>console.log("click")}>
              <div className="bg-red-500 p-[2px] rounded-md">
                <IoMdLogOut size={22} backgroundColor="white" color="white" className="" />
              </div>
              <button>Logout</button>
            </div> */}

            <div className='flex  items-center gap-4  text-lg  w-full py-1 m-1  rounded-md font-semibold' onClick={() => setOpenSettings(true)}>
              {/* <IoSettings  size={25}/> */}
              <div className="bg-purple-500 p-[2px] rounded-md">
                <IoSettings size={22} backgroundColor="white" color="white" className="" />
              </div>
              <button>Settings</button>
            </div>
            <div className='flex  items-center gap-4  text-lg  w-full py-1 m-1  rounded-md font-semibold' onClick={() => {navigate("/Login")}}>
              {/* <IoSettings  size={25}/> */}
              <div className="bg-purple-500 p-[2px] rounded-md">
                <IoMdLogOut size={22} backgroundColor="white" color="white" className="" />
              </div>
              <button>Logout</button>
            </div>
          </div>
          <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <div className="absolute bottom-0    p-4 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-2"> Chatsapp</h1>
            <p className="text-lg"><span className='font-semibold'>Developer</span>: Ankit Prajapat</p>
          </div>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{ sidebar: { background: 'white' } }}
    >
      {
        width > 786
          ?
          <div className={`flex  h-full ${nightmode ? "bg-gray-800 text-white " : " bg-white text-gray-900"}`}>
            {/* Connections and Search Bar - 30% width */}


            <Settings user={userdata} isOpen={isOpenSettings} setOpen={setOpenSettings}></Settings>
            <div className=" relative w-1/2 custom-scrollbar   border-r">
              {
                socket &&
                <Connections socket={socket} sidebarOpen={sidebarOpen} onSetSidebarOpen={onSetSidebarOpen} />
              }
            </div>

            {/* Chat - 70% width */}
            <div className="relative  w-full custom-scrollbar overflow-y-auto  ">
              {socket ? <Chat socket={socket} /> : <p>Loading...</p>}
            </div>
          </div>
          :
          <div className={`flex h-full ${nightmode ? "bg-gray-900 text-white " : " bg-white text-gray-900"}`}>
            {/* Connections and Search Bar - 30% width */}
            <Settings user={userdata} isOpen={isOpenSettings} setOpen={setOpenSettings}></Settings>

            <div className="w-full relative  custom-scrollbar   border-r">

              {
                socket &&
                <Connections socket={socket} sidebarOpen={sidebarOpen} onSetSidebarOpen={onSetSidebarOpen} />
              }     </div>
            {/* <div className="relative  w-full   ">
          {socket ? <Chat socket={socket} /> : <p>Loading...</p>}
        </div> */}
          </div>
      }

    </Sidebar>
  );
};

export default Home;
