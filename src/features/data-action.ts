import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Book,
  BooksList,
  DataSliceState,
  MoreBooksURLData,
  FetchDataResponse,
} from "../models/IDataModels";

const initialState: DataSliceState = {
  booksList: [],
  totalItems: null,
  status: "null",
  book: null,
  moreBooks: [],
  moreBooksURLData: [30, "", "relevance", ""],
};

const dataSlice = createSlice({
  name: "fetchedData",
  initialState,
  reducers: {
    fetchBooks(state, { payload }: PayloadAction<FetchDataResponse>) {
      state.booksList = payload[0];
      state.totalItems = payload[1];
    },
    pendingRequest(state, { payload }: PayloadAction<string>) {
      state.status = payload;
    },
    finishedRequest(state, { payload }: PayloadAction<string>) {
      state.status = payload;
    },
    fetchBook(state, { payload }: PayloadAction<Book>) {
      state.book = payload;
    },
    fetchMoreBooks(state, { payload }: PayloadAction<BooksList[]>) {
      state.booksList = [...state.booksList, ...payload];
    },
    fetchMoreBooksURLData(state, { payload }: PayloadAction<MoreBooksURLData>) {
      state.moreBooksURLData = payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
