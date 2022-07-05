import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "fetchedData",
    initialState: {
        booksList: [],
        totalItems: [],
        status: 'null',
        book: [],
        moreBooks: [],
    },
    reducers: {
        fetchBooks(state, action){
            state.booksList = action.payload;
        },
        fetchTotalItems(state, action){
            state.totalItems = action.payload;
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
            // if(action.payload==='clear'){
            //     state.moreBooks = [];
            // } else {
                state.booksList = [...state.booksList, ...action.payload]
            // state.moreBooks = [...state.moreBooks,...action.payload];
        // }
        }
    },
})

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;