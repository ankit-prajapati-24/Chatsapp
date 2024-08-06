import React from 'react'
import { Sheet } from 'react-modal-sheet';
import { useSelector,useDispatch } from 'react-redux';
import { IoIosCloseCircle } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { setWallpaper } from '../slices/UserDataSlice';
const wallpapers = [
 'https://wallpapercave.com/dwp1x/wp6988787.png',    
 'https://wallpapercave.com/wp/wp6988889.jpg',    
 'https://wallpapercave.com/wp/wp5233236.jpg',    
 'https://wallpapercave.com/wp/wp10254523.jpg',    
 'https://wallpapercave.com/wp/wp10254493.jpg',    
 'https://wallpapercave.com/wp/wp9346845.jpg',    
 'https://wallpapercave.com/wp/wp6989080.jpg',    
 'https://wallpapercave.com/w/wp10254523.jpg',    
];


  
const Wallpapers = ({user, onUpdateProfile, onChangeWallpaper, onChangeTheme, isOpen, setOpen }) => {
    const nightmode = useSelector(state => state.User.nightmode);
    const width = window.innerWidth;
    const dispach = useDispatch();
    const wallpaper = useSelector(state => state.User.wallpaper);

    const containerStyle = {
        display: 'flex',
        width: `${width < 786 ? "100%" : '30%'}`,
        color: "black",
        backgroundColor: `${nightmode ? "#1a202c" : "white"}`,
        backdropFilter: "blur(30px)",
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Ensure it takes full height of the viewport
      };

       function handleWallpaperChange(wallpaper){
              dispach(setWallpaper(wallpaper));
       }
  return (
    <div className='relative'>
     <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[800, 0]}>
      <div>
        <Sheet.Container style={containerStyle}>
        
      
          <Sheet.Content>
            <div className={`p-2 rounded-lg shadow-lg ${nightmode ? "bg-[#1a202c] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div  className=' flex  cursor-pointer  gap-3   ' onClick={ ()=> setOpen(false)}>
        <FaArrowLeft size={22}   color={`${nightmode?"white":'gray'}`} justifyContent="end" />
            <h2 className="text-xl mb-4">Select 
            Wallpaper</h2>
        </div>
            <div className="flex items-center border rounded-xl p-3 justify-center flex-wrap gap-5">
                  {wallpapers.map((url, index) => (
                    <div key={index} className="cursor-pointer" onClick={() => handleWallpaperChange(url)}>
                      <img src={url} alt={`Wallpaper ${index + 1}`} className="w-full h-40 object-cover rounded-md border-2 border-transparent hover:border-blue-500" />
                    </div>
                  ))}
                </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </div>
    </Sheet>
      
    </div>
  )
}

export default Wallpapers
