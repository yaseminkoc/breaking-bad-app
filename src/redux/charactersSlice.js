import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit = 12;
export const getCharacters = createAsyncThunk("characters/getCharacters", async (page) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=${char_limit}&offset=${page*char_limit}`);
    return res.data;
})

export const charactersSlice = createSlice({
    name:"characters",
    initialState:{
        items: [],
        isLoading: false,
        error: null,
        page:0,
        hasNextPage: true,
    },
    reducers:{},
    extraReducers:{
        [getCharacters.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getCharacters.fulfilled]:(state, action) => {
           state.items = [...state.items, ...action.payload];
           state.isLoading = false;
           state.page++;
           if(action.payload.length < 12){
            state.hasNextPage = false;
           }
        },
        [getCharacters.rejected]:(state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
         },
      
    }
})

export default charactersSlice.reducer;