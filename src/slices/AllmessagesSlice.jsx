import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentPartener:"",
   messages:[]
}
const Allmessage = createSlice({
    name: 'allmessages',
    initialState:initialState,
    reducers: {
        addMessages(state,value){
          state.messages.push(value.payload);
        },
    }
})

export const {addMessages} = Allmessage.actions;

export default Allmessage.reducers;