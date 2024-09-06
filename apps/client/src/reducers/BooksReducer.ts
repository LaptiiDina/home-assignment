import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types/type';


interface BooksState {
  books: Array<Book>;
}


const initialState: BooksState = {
  books: [],
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      addBook: (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
      },
      addAllBooks: (state, action: PayloadAction<Array<Book>>) => {
        state.books = action.payload;
      },
      removeBook: (state, action: PayloadAction<number>) => {
        state.books = state.books.filter(book => book.id !== action.payload);
      },
  
      updateBook: (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = { 
          ...state.books[index],
          ...action.payload      
        };
      }
      },
    },
  });

export const { addBook, removeBook, updateBook, addAllBooks } = booksSlice.actions;

export default booksSlice.reducer;
