import React, { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { IoIosCloseCircle } from "react-icons/io";
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import { setUserProfile } from '../slices/UserDataSlice'; // Adjust import based on your setup
import { BsFillPeopleFill, BsPeople } from "react-icons/bs";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FiAtSign } from "react-icons/fi";
import { MdLocalPhone } from "react-icons/md";
const EditUser = ({ user, isOpen, setOpen }) => {
  const dispatch = useDispatch();
  //   const user = useSelector(state => state.User.userdata); // Adjust based on your state structure
  const [name, setName] = useState(user.name);

  const [number, setNumber] = useState(user.number);
  const [bio, setBio] = useState(user.bio);
  //   const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setProfilePhoto(reader.result);
        // dispatch(setUserProfile({ profilePhoto: reader.result })); // Adjust based on your action
      };
      //   reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // dispatch(setUserProfile({ name, number, bio, profilePhoto })); // Adjust based on your action
    setOpen(false);
  };

  const containerStyle = {
    display: 'flex',
    width: '30%',
    color: 'black',
    backgroundColor: '#1a202c',
    backdropFilter: 'blur(30px)',
    // justifyContent: 'center',
    // alignItems: 'center',
     padding: '10px',
    height: '100vh',
  };

  function onUpdateProfile(file) {
    console.log(file);
  }

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[800, 0]}>
      <div>
        <Sheet.Container style={containerStyle}>
          <Sheet.Content>
            <div className="p-6 w-full  rounded-lg shadow-lg bg-[#1a202c] text-white ">
              <div className="flex flex-col items-center mb-6">
                <div className="relative flex items-center justify-center">
                  <img src={user.image} alt="user" className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600" />
                  <label className="absolute bottom-0 right-0 bg-gray-700 dark:bg-gray-900 text-white p-2 rounded-full cursor-pointer">
                    <FaCamera size={20} color="white" />
                    <input type="file" className="hidden" onChange={(e) => onUpdateProfile(e.target.files[0])} />
                  </label>
                </div>
                <h1 className='text-lg '>{user.name}</h1>
                
                {/* <div className="mt-4">
                  {editing ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                      />
                      <button onClick={handleSave} className="ml-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="text-xl font-semibold">{user.name}</div>
                  )}
                  <button onClick={() => setEditing(!editing)} className="mt-2 text-blue-500 hover:underline">
                    {editing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div> */}
              </div>
             
              <div className='flex  items-center gap-4  g  w-full py-1 m-1  rounded-md'   >
                <div className="bg-blue-400 p-[2px] rounded-md">
                  <BsFillPeopleFill size={20} backgroundColor="white" color="white" className="" />
                </div>
                <button >Name</button>
                <span className='text-blue-400  justify-end flex-end absolute right-0 '>{user.name}</span>
              </div>
              <div className='flex  items-center gap-4  g  w-full py-1 m-1  rounded-md'   >
                <div className="bg-yellow-500 p-[2px] rounded-md">
                  {/* <button className='text-white text-xl'> @</button> */}
                  <FiAtSign size={20} backgroundColor="white" color="white" className="" />
                </div>
                <button >UserName</button>
                <span className='text-blue-400  justify-end flex-end absolute right-0 '>{"______"}</span>
              </div>
              <div className='flex  items-center gap-4  g  w-full py-1 m-1  rounded-md'   >
                <div className="bg-lime-600 p-[2px] rounded-md">
                  <MdLocalPhone size={20} backgroundColor="white" color="white" className="" />
                </div>
                <button >Number</button>
                <span className='text-blue-400  justify-end flex-end absolute right-0 '>+91 {user.number}</span>
              </div>

               <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  // value={user.name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border-b-2 border-gray-600 text-white rounded-xl"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="number" className="block font-semibold mb-2">Number</label>
                <input
                  type="text"
                  id="number"
                  // value={user.number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border-b-2 border-gray-600 text-white rounded-xl"
                  placeholder="Enter your number"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block font-semibold ">Username</label>
                <textarea
                  id="username"
                  // value={user.bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border-b-2 border-gray-600 text-white rounded-xl"
                  placeholder="Enter your username"
                  // rows="4"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </div>
    </Sheet>
  );
};

export default EditUser;
