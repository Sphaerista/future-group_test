import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "fetchedData",
    initialState: {
        books: [],
        status: 'null',
        book: [],
        moreBooks: [],
    },
    reducers: {
        fetchBooks(state, action){
            state.books = action.payload;
        },
        pendingRequest(state, action){
            state.status = action.payload;
        },
        finishedRequest(state, action){
            state.status = action.payload;
        },
        fetchBook(state, action){
            state.book = action.payload;
        },
        fetchMoreBooks(state, action){
            if(action.payload==='clear'){
                state.moreBooks = [];
            } else {
            state.moreBooks = [...state.moreBooks,...action.payload];
        }
        }
    },
})

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;