import { Book, BooksListProp } from "../types/type";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import { removeBook } from "../reducers/BooksReducer";
import { useEffect, useState } from "react";
import { useInput } from "../hook/useInput";
import { RootState } from "../store/store";

const baseURL = process.env.REACT_APP_BASIC_URL;
export const BooksList:React.FC<BooksListProp>=(props)=>{
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const[isVissibleForm, setISVissibleForm]=useState(false);
    const[booksVisible, setBooksVisible]=useState<Book[]>([]);
    const title = useInput('');
    const bookList = useSelector((state: RootState) => state.books.books);
    const dispatch = useDispatch();
    const{ handleClickUpdateBook, handleClickAddBook} = props;


    useEffect(() => {
        setBooksVisible(bookList);
      }, [bookList]);
      
    const handleClickFindBook =()=>{
        setISVissibleForm(true) 
    }

    const handleDeleteBookClick=(id: number)=>{
        axios.delete(`${baseURL}/book/${id}`)
        .then((response: AxiosResponse<void>) => {
          dispatch(removeBook(id));
          if(booksVisible){ setBooksVisible(prevBooks => prevBooks.filter(book => book.id !== id));}
        })
        .catch((error: AxiosError) => {
          console.error("Error in removing book", error);
        });
    }

    const fetchBookByTitle = (title: string) => {
        setISVissibleForm(false);
        setErrorMessage(null); 
        return axios
          .get<Book[]>(`${baseURL}/book/${title}`)
          .then((response: AxiosResponse<Book[]>) => {
            if (response.data.length === 0) {
              setErrorMessage(`Book not found by title: "${title}"`);
              setBooksVisible([]); 
            } else {
                setBooksVisible(response.data);
              setErrorMessage(null); 
            }
            return response.data;
          })
          .catch((error: AxiosError) => {
            console.error("Error fetching book by title", error);
            setErrorMessage("An error occurred while fetching the book.");
            setBooksVisible([]); 
            return [];
          });
      };


      const handleClickAllBooks = () => {
        setBooksVisible(bookList); 
        setErrorMessage(null); 
      };

      return (
        <>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button onClick={handleClickAddBook}>add book</button>
            <button onClick={handleClickUpdateBook}>update book</button>
            <button onClick={handleClickFindBook}>find book by title</button>
            <button onClick={handleClickAllBooks}>all books</button>
          </div>
    
          {isVissibleForm && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                placeholder="title"
                value={title.value}
                onChange={title.onChange}
                required
              />
              <button onClick={() => fetchBookByTitle(title.value)}>submit</button>
            </div>
          )}
    
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ul>
              <h1>Books</h1>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {booksVisible.map((book: Book) => (
                <li key={book.id}>
                  <p>id: {book.id}</p>
                  <p>title: {book.title}</p>
                  <p>author: {book.author}</p>
                  <p>price: {book.price}</p>
                  <p>quantity: {book.quantity}</p>
                  <button onClick={() => handleDeleteBookClick(book.id)}>delete book</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    };