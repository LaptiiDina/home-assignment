import { useDispatch } from "react-redux";
import { useInput } from "../hook/useInput";
import { useNavigate } from "react-router-dom";
import { Book } from "../types/type";
import { updateBook } from "../reducers/BooksReducer";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

const baseURL = process.env.REACT_APP_BASIC_URL;
export const UpdateBook:React.FC=()=>{
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const id = useInput('');
    const title = useInput('');
    const author = useInput('');
    const price = useInput('');
    const quantity = useInput('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      const parsedPrice = parseFloat(price.value);
      const parsedQuantity = parseInt(quantity.value);

      if (!id.value) {
        setErrorMessage('Id is required!');
        return;
      }
      if (parsedPrice <= 0 || parsedQuantity <= 0) {
        setErrorMessage('Price and Quantity must be positive values!');
        return;
      }
      setErrorMessage(null);
  
      const updatedBook: Partial<Book> = {};

      if (title.value) updatedBook.title = title.value;
      if (author.value) updatedBook.author = author.value;
      if (price.value) updatedBook.price = parsedPrice;
      if (quantity.value) updatedBook.quantity = parsedQuantity;
  
      axios.put<Book>(`${baseURL}/book/${id.value}`, updatedBook)
        .then((response: AxiosResponse<Book>) => {
          dispatch(updateBook(response.data));
          title.reset();
          author.reset();
          price.reset();
          quantity.reset();
          navigate('/')
        })
        .catch((error: AxiosError) => {
            if(error.code === '404'){
                setErrorMessage('this id not exist')
            }
          console.error("Error in updating book", error);
        });
    };
  
    return (
      <div>
        <h1>Update book</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
        <input type="number" min="0" placeholder="id of book" value={id.value} onChange={id.onChange} required/>
        <input type="text" placeholder="title" value={title.value} onChange={title.onChange}/>
        <input type="text" placeholder="author" value={author.value} onChange={author.onChange}/>
        <input
        value={price.value} onChange={price.onChange}
          type="number"
          placeholder="price"
          step="0.01"
          min="0"
        />
        <input
        value={quantity.value} onChange={quantity.onChange}
          type="number"
          placeholder="quantity"
          min="0"
        />
        <button onClick={handleSubmit}>update</button>
      </div>
    );
}