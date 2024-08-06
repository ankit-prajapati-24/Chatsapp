import React, { useState } from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import { FaCamera } from 'react-icons/fa';
import { IoMdColorPalette, IoMdImage, IoMdPerson, IoMdHelpCircle } from 'react-icons/io';
import { MdSettings, MdModeEdit } from 'react-icons/md';
import { Sheet } from 'react-modal-sheet';
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Wallpapers from './Wallpapers';
import { IoIosCloseCircle } from "react-icons/io";
import EditUser from './EditUser';
import Theme from './Theme';
import Help from './Help';
import { apiConnecter } from './services/apiconnecter';
import { setuserdata } from '../slices/UserDataSlice';
import toast, { Toaster } from 'react-hot-toast';
const Settings = ({ user, onUpdateProfile, onChangeWallpaper, onChangeTheme, isOpen, setOpen }) => {
  
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [isOpenWallpaper, setOpenWallpaper] = useState(false);
  const [isOpenEditing, setOpenEditing] = useState(false);
  const [isOpenTheme, setOpenTheme] = useState(false);
  const [isOpenHelp, setOpenHelp] = useState(false);
  const dispatch = useDispatch();
  const formdata = new  FormData();

  const nightmode = useSelector(state => state.User.nightmode);
  const width = window.innerWidth;
  async function uploadImage() {
    const id = toast.loading(`Uploading..`);
    try {
      const response = await apiConnecter("post", "Profile/UpdateProfile", formdata);
      console.log(response);
      dispatch(setuserdata(response.data.data.user))
      toast.success("Profile updated successfully")
      toast.dismiss(id);
    }
    catch (e) {
      toast.dismiss(id);
      console.log(e);
    }
  }

  
  const handleFileChange = (event) => {
    // Handle the selected file
    
    const selectedFile = event.target.files[0];
    formdata.append("Image", event.target.files[0]);
    formdata.append("number", user.number);
    uploadImage();
  };

  const handleSave = () => {
    onUpdateProfile(newName);
    setEditing(false);
  };

  const containerStyle = {
    display: 'flex',
    width: `${width < 786 ? "100%" : '30%'}`,
    color: `${nightmode ? "white" : "#1a202c"}`,
    backgroundColor: `${nightmode ? "#1a202c" : "white"}`,
    // backdropFilter: "blur(30px)",
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Ensure it takes full height of the viewport
  };

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[800, 0]}>
      <div>
        <Sheet.Container style={containerStyle}>
        <div  className=' flex items-end flex-col cursor-pointer   absolute  m-3 left-0 top-0 justify-end' onClick={ ()=> setOpen(false)}>
        <FaArrowLeft size={22}   color={`${nightmode?"white":'gray'}`} justifyContent="end" />
        </div>
          <Sheet.Content>
            <div className={`p-6 rounded-lg  `}>
              <div className="flex flex-col items-center mb-6">
                <div className="relative flex items-center justify-center">
                  <img src={user.image} alt="user" className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600" />
                  <label className="absolute bottom-0 right-0 bg-gray-700 dark:bg-gray-900 text-white p-2 rounded-full cursor-pointer">
                    <FaCamera size={20} color="white" />
                    <input type="file" className="hidden" onChange={(e) => handleFileChange(e)} />
                  </label>
                </div>
                <div className="mt-4">
               
                <div className="text-xl font-semibold">{user.name}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={()=>{   setOpenWallpaper(true)}}>
                  <div className="bg-blue-500 p-[2px] rounded-md">
                    <IoMdImage size={22} color="white" className="" />
                  </div>
                  <span className=" font-semibold ml-2">Change Wallpaper</span>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={()=> {setOpenEditing(true)}}>
                  <div className="bg-green-500 p-[2px] rounded-md">
                    <MdModeEdit size={22} color="white" className="" />
                  </div>
                  <span className=" font-semibold ml-2">Edit Profile</span>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={()=> setOpenTheme(true)}>
                  <div className="bg-purple-500 p-[2px] rounded-md">
                    <IoMdColorPalette size={22} color="white" className="" />
                  </div>
                  <span className=" font-semibold ml-2">Change Theme</span>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={onChangeWallpaper}>
                  <div className="bg-orange-500 p-[2px] rounded-md">
                    <IoMdPerson size={22} color="white" className="" />
                  </div>
                  <span className=" font-semibold ml-2">Privacy and Security</span>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={onChangeWallpaper}>
                  <div className="bg-teal-500 p-[2px] rounded-md">
                    <MdSettings size={22} color="white" className="" />
                  </div>
                  <span className=" font-semibold ml-2">Language</span>
                </div>
                <div className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={()=> setOpenHelp(true)}>
                  <div className="bg-red-500 p-[2px] rounded-md">
                    <BiHelpCircle size={22} color="white" className="" />
                  </div>
                  <span className=" font-semibold ml-2">Help</span>
                </div>
                
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </div>
      <Wallpapers user = {user} isOpen={ isOpenWallpaper} setOpen={ setOpenWallpaper}/>
      <EditUser user = {user} isOpen={ isOpenEditing} setOpen={ setOpenEditing}/>
      <Theme user = {user} isOpen={ isOpenTheme} setOpen={ setOpenTheme}/>
      <Help user = {user} isOpen={ isOpenHelp} setOpen={ setOpenHelp}/>
    </Sheet>
  );
};

export default Settings;
