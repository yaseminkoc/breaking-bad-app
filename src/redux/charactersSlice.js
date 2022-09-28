import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit = 12;
export const getCharacters = createAsyncThunk("characters/getCharacters", async (page) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=${char_limit}&offset=${page * char_limit}`);
    return res.data;
})

export const charactersSlice = createSlice({
    name: "characters",
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        page: 0,
        hasNextPage: true,
    },
    reducers: {},
    extraReducers: {
        [getCharacters.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getCharacters.fulfilled]: (state, action) => {
            state.items = [...state.items, ...action.payload];
            state.status = 'succeeded';
            state.page++;
            if (action.payload.length < 12) {
                state.hasNextPage = false;
            }
        },
        [getCharacters.rejected]: (state, action) => {
            state.error = action.error.message;
            state.status = 'failed';
        },

    }
})

export default charactersSlice.reducer;