import axios, { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { addBook } from '../reducers/BooksReducer';
import { Book, CreateBookType } from '../types/type';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../hook/useInput';
import { useState } from 'react';


const baseURL = process.env.REACT_APP_BASIC_URL;
export const CreateBook = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

    if (!title.value || !author.value || !price.value || !quantity.value) {
      setErrorMessage('All fields are required!');
      return;
    }
    if (parsedPrice <= 0 || parsedQuantity <= 0) {
      setErrorMessage('Price and Quantity must be positive values!');
      return;
    }
    setErrorMessage(null);

    const newBook: CreateBookType = {
      title: title.value,
      author: author.value,
      price: parsedPrice,
      quantity: parsedQuantity,
    };

    axios.post<Book>(`${baseURL}/book`, newBook)
      .then((response: AxiosResponse<Book>) => {
        dispatch(addBook(response.data));
        title.reset();
        author.reset();
        price.reset();
        quantity.reset();
        navigate('/')
      })
      .catch((error: AxiosError) => {
        console.error("Error in adding book", error);
      });
  };

  return (
    <div>
      <h1>Create new book</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
      <input type="text" placeholder="title" value={title.value} onChange={title.onChange} required/>
      <input type="text" placeholder="author" value={author.value} onChange={author.onChange} required/>
      <input
        value={price.value} onChange={price.onChange}
        type="number"
        placeholder="price"
        step="0.01"
        min="0"
        required
      />
        <input
        value={quantity.value} onChange={quantity.onChange}
        type="number"
        placeholder="quantity"
        min="0"
        required
      />
      <button onClick={handleSubmit}>add new book</button>
    </div>
  );
};
