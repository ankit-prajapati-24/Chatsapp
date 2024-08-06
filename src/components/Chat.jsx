import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnecter } from './services/apiconnecter';
import { FaCamera } from "react-icons/fa";
import { set } from 'react-hook-form';
import { Sheet } from 'react-modal-sheet';
import { setWallpaper } from '../slices/UserDataSlice';

const Chat = ({ socket }) => {
    const [isOpen, setOpen] = useState(false);
    const [isOpen2, setOpen2] = useState(false);
    const [currentView, setCurrentView] = useState();

    const messagesEndRef = useRef();
    const fileInputRef = useRef(null);
    const nightmode = useSelector(state => state.User.nightmode);
    const userdata = useSelector(state => state.User.userdata);
    const wallpaper = useSelector(state => state.User.wallpaper);
    const bgColor = useSelector(state => state.User.bgColor);
    const textColor = useSelector(state => state.User.textColor);
    var image = null;
    // const [bg, setBg] = useState("https://wallpapercave.com/dwp2x/wp7130410.jpg");
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const currentPartner = useSelector(state => state.partner.currentPartner);
    const [reciever, setReciever] = useState(currentPartner.number ? currentPartner.number : "");
    const [sender, setSender] = useState(userdata.number);
    const inputref = useRef();
    const width = window.innerWidth;
    const formdata = new FormData();

    async function uploadImage() {
        try {
            const response = await apiConnecter("post", "Message/uploadImage", formdata);
            console.log(response);
            setMessages([...messages, {
                Number: sender,
                MessageText: "",
                Image: response.data.imageLink,
                name: userdata.name,
                date: gettime()
            }]);
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            setMessage('');
            return response.data.imageLink;
        }
        catch (e) {
            console.log(e);
        }
    }
    async function sendMessage() {
        console.log("sendMessage function called");

        if (!image) {
            socket.emit('chat-message', message, sender, currentPartner.number, userdata.name, gettime());
        }
        else {
            const message = await uploadImage();
            socket.emit('image-message', message, sender, currentPartner.number, userdata.name, gettime());

        }
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    function gettime() {
        // Function to get current time
        var currentDate = new Date();
        const width = window.innerWidth;
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var meridiem = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var currentTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + meridiem;
        return currentTime;
    }



    async function getAllchat() {
        try {
            const response = await apiConnecter("post", "Message/getRoomChat", { sender, reciever: currentPartner.number });
            setMessages(response.data.chats ? response.data.chats.Messages : []);
            console.log(response.data.chats);
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (err) {
            console.log(err);
        }
    }

    socket.on("chat-message", (msg) => {
        setMessages([...messages, {
            Number: currentPartner.number,
            MessageText: msg,
            date: gettime()
        }]);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    socket.on("image-message", (msg) => {
        setMessages([...messages, {
            Number: currentPartner.number,
            MessageText: "",
            Image: msg,
            date: gettime()
        }]);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    useEffect(() => {
        // if (!nightmode) {
        //     dispatch(setWallpaper("https://wallpapercave.com/wp/wp4410779.png"))
        //     // setBg("https://wallpapercave.com/wp/wp4410779.png");
        // }
        // else
        // //  setBg(("https://wallpapercave.com/dwp2x/wp7130410.jpg"))
        // dispatch(setWallpaper("https://wallpapercave.com/dwp2x/wp7130410.jpg"))
        getAllchat();
    }, [currentPartner, nightmode]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    function clickhandler() {
        inputref.current.click();
    }
    const handleSendMessage = () => {

        console.log("handleSendMessage function called", image);

        if (message.trim()) {
            setMessages([...messages, {
                Number: sender,
                MessageText: message,
                name: userdata.name,
                date: gettime()
            }]);
            // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            sendMessage();
            setMessage('');
        }
        else if (image != null) {
            setMessages([...messages, {
                Number: sender,
                // Image:"https://img.freepik.com/premium-vector/loading-icon-logo-vector-design-template_827767-2356.jpg?w=2000",
                // MessageText: "loading image",
                name: userdata.name,
                date: gettime()
            }]);
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            sendMessage();
            setMessage('');
        }
    };
    const handleFileChange = (event) => {
        // Handle the selected file
        const selectedFile = event.target.files[0];
        formdata.append("Image", event.target.files[0]);
        image = selectedFile;
        console.log("handleFileChange function called", event.target.files[0]);
        handleSendMessage();
        // Dispatch an action to update the user's image in the Redux store
        // dispatch(setUserImage(selectedFile));
        // You can add logic here to handle the file upload if needed
    };
   function viewImage(file){
     setCurrentView(file);
     setOpen2(true);
   }
    const sheetStyle = {
        width: '100%', // Adjust the width as needed
        maxWidth: '500px', // Optional: set a max-width
    };
    const containerStyle = {
        display: 'flex',
        width: `${width < 786 ? "100%" : '20%'}`,
        color: "black",
        backgroundColor: `${nightmode ? "black" : "white"}`,
        blur: "30%",
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Ensure it takes full height of the 
       
    };
    // bg-[#1a202c]
    return (
        <>
            {currentPartner ? (
                <div className={`flex flex-col py-2  h-full  w-full mx-auto rounded-lg shadow-lg ${bgColor} ${textColor}  `}>
                {/* <div className={`flex flex-col py-2  h-full  w-full mx-auto rounded-lg shadow-lg ${nightmode ? "bg-[#1a202c] text-white" : "bg-white text-gray-900"}`}> */}
                {/* <div className={`flex flex-col py-2  h-full  w-full mx-auto rounded-lg shadow-lg ${bgColor} ${bgColor}`} > */}
                    {/* Header */}
                    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[400, 0]}>
                        <div >
                            <Sheet.Container style={containerStyle}>
                                <Sheet.Header />
                                <Sheet.Content>
                                    <div className={`${nightmode ? "bg-black text-white" : "bg-white to-black"}  p-4 rounded-lg shadow-lg`} >
                                        <div className="flex flex-col items-center justify-center mb-6">
                                            <img
                                                src={currentPartner.image}
                                                alt={`${currentPartner.name}'s profile`}
                                                className="h-24 w-24 rounded-full object-cover border-4 border-gray-600"
                                            />
                                            <div className="mt-2 text-xl font-semibold">{currentPartner.name}</div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-sm font-medium text-gray-400">Name</div>
                                            <div className="text-lg">{currentPartner.name}</div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-sm font-medium text-gray-400">About</div>
                                            <div className="text-lg">{"Jay Shree Ram"}</div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="text-sm font-medium text-gray-400">Number</div>
                                            <div className="text-lg">{currentPartner.number}</div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Block
                                            </button>
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Report Contact
                                            </button>
                                        </div>
                                    </div>

                                    {/* Your sheet content goes here */}
                                </Sheet.Content>
                            </Sheet.Container>
                        </div>
                        <Sheet.Backdrop />
                    </Sheet>
                    <Sheet isOpen={isOpen2} onClose={() => setOpen2(false)} snapPoints={[800, 0]}>
                        <div >
                            <Sheet.Container  style={{backgroundColor:"transparent"}}>
                                {/* <Sheet.Header  style={{backgroundColor:"transparent"}}/> */}
                                <Sheet.Content>
                                <div className={`${nightmode ? "bg-black/50 text-white" : "bg-transparent backdrop-blur-sm text-black"} h-full flex items-center justify-center p-4 rounded-lg shadow-lg overflow-hidden`}>
                                    <div className="max-w-full max-h-96 flex items-center justify-center p-4">
                                        <img
                                            src={currentView}
                                            className="max-w-full max-h-[690px] rounded-md   object-contain p-4" />
                                    </div>
                                </div>




                                    {/* Your sheet content goes here */}
                                </Sheet.Content>
                            </Sheet.Container>
                        </div>
                        <Sheet.Backdrop />
                    </Sheet>
                    <div className={` flex rounded-md items-center p-2 ${nightmode ? "bg-[#1a202c] text-white" : "bg-white text-gray-900"} bg-${bgColor}-500  text-${textColor}-100`}>
                        <img
                            src={currentPartner.image}
                            alt="User"
                            className="w-10 h-10 rounded-full mr-4  object-cover"
                            onClick={() => setOpen(true)}
                        />
                        <span className="text-lg font-medium">{currentPartner.name}</span>
                    </div>

                    {/* Message Area */}
                    <div

                        //   style={{ backgroundImage: 'url(https://wallpapercave.com/wp/wp4410779.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                       
                        //    style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}

                        // className={`flex-1 p-2 flex-col  overflow-y-auto overflow-x-hidden items-center ${nightmode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"} ${bgColor} ${textColor}`}>
                        className={`flex-1 p-2 flex-col  overflow-y-auto overflow-x-hidden items-center  bg-${bgColor}-400 ${textColor}`}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex  custom-scrollbar  mb-2 gap-1 ${msg.Number == sender ? 'flex-row-reverse ' : 'justify-start'}`}
                            >
                                <img src={msg.Number == sender ? userdata.image : currentPartner.image} className='h-8 w-8  object-cover rounded-full' alt="" />

                                {
                                    msg.MessageText
                                        ?
                                        <div className={`rounded-xl p-2 flex  flex-col max-w-xs   ${msg.Number == sender ? (nightmode ? "bg-sky-900 text-white" : "bg-yellow-100 text-black") : (nightmode ? "bg-gray-800 text-white" : "bg-white text-black")}`}>
                                            {msg.MessageText}
                                            <div className={`text-end text-xs font-semibold text-gray-500`}>
                                                {msg.date}
                                            </div>
                                        </div>
                                        : msg.Image ?
                                            <div className='relative' onClick={()=> viewImage(msg.Image)}>
                                                <img src={msg.Image} className='h-full w-full max-h-[300px] max-w-[300px] rounded-md' alt="image" />
                                                <div className={`absolute bottom-0 right-0 text-end text-xs font-semibold text-gray-500`}>
                                                    {msg.date}
                                                </div>
                                            </div>
                                            :
                                            <div className=' h-[250px] flex items-center justify-center w-[250px]'>
                                                <span class="loader"></span>
                                            </div>
                                }
                            </div>
                        ))}
                        <div ref={messagesEndRef} className='mb-[10px] h-4 ' />
                    </div>

                    {/* Input Area */}
                    {/* <div className={` ${nightmode ? "bg-[#1a202c]" : "bg-gray-100"}  flex items-center p-1 `}> */}
                    <div className={` bg-${bgColor}-500  flex items-center p-1 `}>
                        <input type='file' ref={inputref} className='hidden' onChange={handleFileChange}></input>
                        <div className='absolute p-2 ' onClick={clickhandler} >
                            <FaCamera />
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                            // className={`block w-full p-2 ps-10 text-sm  outline-none rounded-lg bg-gray-20 ${nightmode ? "placeholder:bg-[#1a202c] bg-[#1a202c] text-white" : "bg-gray-300 placeholder:bg-gray-300 text-gray-900"} mr-1`}
                            className={`block w-full p-2 ps-10 text-sm  outline-none rounded-lg ${nightmode ? "placeholder:bg-[#1a202c] bg-[#1a202c] text-white" : "bg-gray-300 placeholder:bg-gray-300 text-gray-900"}   placeholder:bg-${bgColor}-500 bg-${bgColor}-500 ${textColor} mr-1`}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            onFocus={(e)=> e.target.scrollIntoView({ behavior: "smooth" })}
                        />
                        {/* <button
                            onClick={handleSendMessage}
                            className="    bg-blue-500 text-white p-2 rounded-lg"
                        >
                            Send
                        </button> */}
                    </div>
                </div>
            ) : (
                <div className={`${nightmode ? "bg-[#1a202c] rounded-md text-white" : "text-black bg-gray-100"} text-xl flex h-screen flex-col items-center justify-center`}>
                    <h1 className={`${nightmode ? "bg-gray-800 " : "bg-gray-200"} font-semibold p-1 rounded-xl`}>Select a chat to start messaging</h1>
                </div>
            )}
        </>
    );
};

export default Chat;
