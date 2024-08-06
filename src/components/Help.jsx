import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Sheet } from 'react-modal-sheet';

const Help = ({ isOpen, setOpen }) => {
  const nightmode = useSelector(state => state.User.nightmode);
  const width = window.innerWidth;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    width: `${width < 786 ? "100%" : '30%'}`,
    color: `${nightmode ? "white" : "#1a202c"}`,
    backgroundColor: `${nightmode ? "#1a202c" : "white"}`,
    height: '100vh',
    padding: '20px',
  };

  const additionalOptions = [

    { title: 'Rate the website' },
    { title: 'Contact us' },
    { title: 'License' },
    { title: 'Privacy Policy' },
    { title: 'Version Name: 1.0.0' },
  ];

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[600, 0]}>
      <Sheet.Container style={containerStyle}>
        <div className="flex justify-start w-full mb-4">
          <FaArrowLeft size={22} color={`${nightmode ? "white" : 'gray'}`} onClick={() => setOpen(false)} />
          <h2 className="text-xl  ml-2 ">Help</h2>
       
        </div>
        <Sheet.Content>
          <div className="flex flex-col  text-left  w-full  p-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: nightmode ? "white" : "gray" }}>Chatsapp</h2>
            <p className="text-sm mb-4" style={{ color: nightmode ? "white" : "gray" }}>Version: 1.0.0</p>
            <div className="w-full mb-8 text-left">
             <h1 className='text-2xl font-semibold '>Contact Us</h1>
             <h1 className='flex  flex-wrap  text-sm my-2'>We'd like to know your thoughts about this website.</h1>
              {additionalOptions.map((option, index) => (
                <div key={index} className="w-full py-2  border-gray-200 ">
                  <button
                    className="w-full text-lg text-start text-green-500 mb-3"
                    // style={{ color: nightmode ? "blue" : "#1a202c" }}
                    onClick={() => console.log(`${option.title} clicked`)}
                  >
                    {option.title}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <p style={{ color: nightmode ? "white" : "gray" }}>2024 @Chatsapp</p>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default Help;
