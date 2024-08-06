import React, { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { IoIosCloseCircle } from "react-icons/io";
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../slices/UserDataSlice'; // Adjust import based on your setup

const EditUserDetails = ({ isOpen, setOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.User); // Adjust based on your state structure
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number);
  const [bio, setBio] = useState(user.bio);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        dispatch(setUserProfile({ profilePhoto: reader.result })); // Adjust based on your action
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    dispatch(setUserProfile({ name, number, bio, profilePhoto })); // Adjust based on your action
    setOpen(false);
  };

  const containerStyle = {
    display: 'flex',
    width: '100%',
    color: 'black',
    backgroundColor: '#1a202c',
    backdropFilter: 'blur(30px)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[800, 0]}>
      <div>
        <Sheet.Container style={containerStyle}>
          <Sheet.Content>
            <div className="p-6 rounded-lg shadow-lg bg-[#1a202c] text-white">
              <div className='relative flex items-center justify-center mb-6'>
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                />
                <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
                  <FaCamera size={20} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
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
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border-b-2 border-gray-600 text-white rounded-xl"
                  placeholder="Enter your number"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bio" className="block font-semibold mb-2">Bio</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border-b-2 border-gray-600 text-white rounded-xl"
                  placeholder="Enter your bio"
                  rows="4"
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

export default EditUserDetails;
