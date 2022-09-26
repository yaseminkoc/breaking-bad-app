import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCharacters = createAsyncThunk("characters/getCharacters", async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=10`);
    return res.data;
})

export const charactersSlice = createSlice({
    name:"characters",
    initialState:{
        items: [],
    },
    reducers:{},
    extraReducers:{
        [getCharacters.fulfilled]:(state, action) => {
            console.log(action.payload);
        }
    }
})

export default charactersSlice.reducer;