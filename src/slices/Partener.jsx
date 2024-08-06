import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // currentPartner: {name:"ankit",number:"8103401549",image:"https://wallpapercave.com/dwp2x/wp7130410.jpg"},
    currentPartner: "",
    currentMessages: []
};

const PartnerSlice = createSlice({
    name: "partner",
    initialState: initialState,
    reducers: {
        addCurrentPartner(state, action) {
            state.currentPartner = action.payload;
        },
        addCurrentMessages(state, action) {
            state.currentMessages.push(action.payload);
        }
    }
});

export const { addCurrentMessages, addCurrentPartner } = PartnerSlice.actions;

export default PartnerSlice.reducer;
