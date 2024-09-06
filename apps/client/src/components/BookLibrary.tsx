import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllBooks } from "../reducers/BooksReducer";
import { Book } from "../types/type";
import axios, { AxiosError, AxiosResponse } from "axios";
import { RootState } from "../store/store";
import { BooksList } from "./BooksList";
import { EmptyList } from "./EmptyList";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASIC_URL;

export const BookLibrary=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector((state: RootState) => state.books.books);
    const handleClickAddBook = () => {
      navigate('/create-books');
      };

      const handleClickUpdateBook = () => {
        navigate('/update-books', { state: { action: 'update_book' } });
        };

    useEffect(() => {
        axios.get<Book[]>(`${baseURL}/book`)
        .then((response: AxiosResponse<Book[]>) => {
          dispatch(addAllBooks(response.data));
        })
        .catch((error: AxiosError) => {
          console.error("error during loading", error);
        });
    }, [dispatch]);
  
   
return (
    <>
{
    books.length ?
      <BooksList books={books} handleClickUpdateBook={handleClickUpdateBook} handleClickAddBook={handleClickAddBook}/>:
      <EmptyList handleClickAddBook={handleClickAddBook}/>
}
    </>
)
}
