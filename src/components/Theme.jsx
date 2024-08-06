import React, { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setBgColor, setTextColor } from '../slices/UserDataSlice';
const Theme = ({ isOpen, setOpen, currentTheme, setCurrentTheme }) => {
  const dispatch = useDispatch(); 
  const nightmode = useSelector(state => state.User.nightmode);
    const themes = [
        { name: 'Classic', value: 'white', bg: "bg-gray-200", senderMessage: "bg-white", receiverMessage: "bg-yellow-400" },
        { name: 'Tinted', value: 'tinted', bg: "bg-gray-700", senderMessage: "bg-white", receiverMessage: "bg-black" },
        { name: 'Classic', value: 'lime', bg: "bg-lime-100", senderMessage: "bg-blue-100", receiverMessage: "bg-gray-100" },
        { name: 'Day', value: 'sky', bg: "bg-sky-300", senderMessage: "bg-white", receiverMessage: "bg-black" },
        { name: 'Night', value: 'green', bg: "bg-green-300", senderMessage: "bg-white", receiverMessage: "bg-black" },
        { name: 'Red Night', value: 'red', bg: "bg-red-500", senderMessage: "bg-white", receiverMessage: "bg-black" },
        { name: 'Blue Night', value: 'blue', bg: "bg-blue-500", senderMessage: "bg-white", receiverMessage: "bg-black" }
      ];
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    setOpen(false);
  };
 const width = window.innerWidth;
  const containerStyle = {
    display: 'flex',
    width: `${width < 786 ? "100%" : '30%'}`,
    color: 'black',
    backgroundColor: '#1a202c',
    backdropFilter: 'blur(30px)',
    padding: '10px',
    height: '100vh',
  };

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[800, 0]}>
      <Sheet.Container style={containerStyle}>
        <Sheet.Content>
          <div className="p-6 w-full rounded-lg shadow-lg bg-[#1a202c] text-white">
          <div  className=' flex  cursor-pointer  gap-3   ' onClick={ ()=> setOpen(false)}>
        <FaArrowLeft size={22}   color={`${nightmode?"white":'gray'}`} justifyContent="end" />
            <h2 className="text-xl mb-4">Select Theme</h2>
        </div>
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                
                <div className={`w-full py-6 h-28 flex flex-col p-2  border rounded-md  ${theme.bg}`} onClick={() => dispatch(setBgColor(theme.value))}>
                    <div className={`${theme.senderMessage} p-2 bg-white  w-20 rounded-md `}></div>
                    <div className={`${theme.receiverMessage} p-2 bg-gray-300 w-20  ml-20 mt-1 rounded-md`}></div>
                </div>
              ))}
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default Theme;
