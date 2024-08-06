import React, { useState, useEffect } from 'react';
import { apiConnecter } from './services/apiconnecter';
import { useDispatch, useSelector } from 'react-redux';
import { setConnections } from '../slices/UserDataSlice';
import { addCurrentPartner } from '../slices/Partener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// import ContactsComponent from './ContactsComponent';
import { LuImage } from "react-icons/lu";

export const Connections = ({ socket, sidebarOpen, onSetSidebarOpen }) => {
    const dispatch = useDispatch();
    const nightmode = useSelector(state => state.User.nightmode);
    const userdata = useSelector(state => state.User.userdata);
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [myconnections, setMyConnections] = useState([]);
    const [lastMessages, setLastMessages] = useState({});
    const connections = useSelector(state => state.User.connections);

    const getConnections = async () => {
        try {
            const response = await apiConnecter("post", "Message/getMyconnections", { number: userdata.number });
            dispatch(setConnections(response.data.myconnection));
            const response2 = await apiConnecter("get", "Profile/getAllUsers");
            setMyConnections(response.data.myconnection);
            response.data.myconnection.forEach((partner) => socket.emit('connectRoom', "hey i am using chatsapp", userdata.number, partner.number, userdata.name));
            setAllUsers(response2.data.users);
        } catch (err) {
            console.log(err);
        }
    };

    const findUsers = (searchQuery) => {
        if (!searchQuery) {
            dispatch(setConnections(myconnections));
            return;
        }
        const regex = new RegExp(searchQuery, 'i');
        const filteredUsers = allUsers.filter(user =>
            regex.test(user.number) ||
            regex.test(user.name)
        );
        dispatch(setConnections(filteredUsers));
    };

    useEffect(() => {
        getConnections();
    }, []);

    useEffect(() => {
        if (!query) {
            getConnections();
        } else {
            findUsers(query);
        }
    }, [query]);

    useEffect(() => {
        if (connections.length > 0) {
            const fetchLastMessages = async () => {
                const messages = {};
                for (const person of connections) {
                    const response = await apiConnecter("post", "Message/getRoomChat", { sender: userdata.number, reciever: person.number });
                    const chats = response.data.chats ? response.data.chats.Messages : [];
                    messages[person._id] = chats.length > 0 ? chats[chats.length - 1] : null;
                }
                setLastMessages(messages);
            };
            fetchLastMessages();
        }
    }, [connections]);

    return (
        <div className={`p-4 rounded-md w-full h-full overflow-scroll overflow-x-hidden ${nightmode ? "bg-[#1a202c] text-white" : "bg-white text-gray-900"}`}>
            <div className='flex items-center justify-start'>
                <button className="mb-4 mr-2" onClick={() => onSetSidebarOpen(true)}>
                    <FontAwesomeIcon icon={faBars} size="xl" />
                </button>
                <h2 className="text-4xl font-italic mb-4 text-black shining-text text-start">Chatsapp</h2>
            </div>
            <div className='flex gap-2 items-center justify-center'>
                <form className='w-full mb-3'>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-black">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className={`block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-20 ${nightmode ? "placeholder:bg-gray-800 bg-gray-800 text-white" : "bg-gray-300 placeholder:bg-gray-300 text-gray-900"} mr-1`}
                            placeholder="Search your Friends..."
                            required
                        />
                    </div>
                </form>
            </div>
            {connections && connections.map((person) => (
                <div key={person._id} className={`flex items-center mb-4 py-2 px-4 rounded-lg shadow-md ${nightmode ? "hover:bg-gray-700" :"hover:bg-gray-200"} cursor-pointer `} onClick={() => {
                    dispatch(addCurrentPartner(person));
                    if (window.innerWidth < 786) {
                        navigate("/Chat");
                    }
                }}>
                    <img src={person.image} alt={person.name} className="w-12 h-12 object-cover rounded-full mr-4" />
                    <div className="flex flex-col justify-between flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-lg font-medium">{person.name}</span>
                            <span className="text-sm text-gray-400">{lastMessages[person._id]?.date || ""}</span>
                        </div>
                        <div className="text-sm text-gray-400">{lastMessages[person._id]?.MessageText.slice(0,60) || ""}</div>
                        {lastMessages[person._id]?.date && !lastMessages[person._id]?.MessageText && (
                            <div className="flex items-center">
                                <LuImage />
                                <span className='ml-2'>Image</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
