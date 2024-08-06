import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Image:"",
    userdata:localStorage.getItem("userdata")?JSON.parse(localStorage.getItem("userdata")):"",
    SignData:"",
    socket:null,
    query:"",
    token:localStorage.getItem("token")?localStorage.getItem("token"):"",
    search:false,
    connections:"",
    nightmode:true,
    wallpaper:localStorage.getItem("wallpaper")?localStorage.getItem("wallpaper"):"https://wallpapercave.com/dwp2x/wp7130410.jpg",
    bgColor:localStorage.getItem("bgColor")?localStorage.getItem("bgColor"):"",
    textColor:localStorage.getItem("textColor")?localStorage.getItem("textColor"):"",
}

const userDataSlice = createSlice({
    name:"User",
    initialState:initialState,
    reducers:{
        setUserImage(state,value){
           state.Image = value.payload;
        },
        setNightmode(state,value){
            state.nightmode = value.payload;
         },
         setuserdata(state, value) {
            // Create a copy of the user data without the "Favorite" property
            const userDataWithoutFavorite = { ...value.payload };
            delete userDataWithoutFavorite.Chats;
        
            // Convert the modified user data object to a JSON string
            const userDataString = JSON.stringify(userDataWithoutFavorite);
        
            // Store the JSON string in localStorage
            localStorage.setItem("userdata", userDataString);
        
            // Update the state with the modified user data object
            state.userdata = userDataWithoutFavorite;
        },
        
         setSocket(state,value){
            state.socket = value.payload
         },
         setquery(state,value){
            state.query = value.payload
         },
         setsearch(state,value){
            state.search = value.payload
         },
         setSignData(state,value){
            state.SignData = value.payload
         },
         setToken(state,value){

         localStorage.setItem("token",value.payload);
            state.token = value.payload
         },
         setConnections(state,value){
            state.connections = value.payload
         },
         setWallpaper(state,value){
            state.wallpaper = value.payload;
            localStorage.setItem('wallpaper',value.payload);
         },
         setBgColor(state,value){
            state.bgColor = value.payload;
            localStorage.setItem('bgColor',value.payload);
         },
         setTextColor(state,value){
            state.textColor = value.payload;
            localStorage.setItem('textColor',value.payload);
         },
    }
})

export const {setWallpaper,Image,setUserImage,setcType,setNightmode,setuserdata,userdata,socket,setSocket,setBgColor,setTextColor,setquery,search,setsearch,setSignData,SignData,Token,setToken,setConnections} = userDataSlice.actions;
export default userDataSlice.reducer;


// export const {setuserdata,userdataform} = SignUpData.actions;
// export default SignUpData.reducer;
