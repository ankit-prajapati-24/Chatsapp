import { combineReducers } from "@reduxjs/toolkit";
import UserDataSlice from "../slices/UserDataSlice";
import allmessages from "../slices/AllmessagesSlice";
import PartenerSlice from "../slices/Partener";
const rootReducer = combineReducers({
    User:UserDataSlice,
    partner:PartenerSlice,
    Allmessages:allmessages
});

export default  rootReducer