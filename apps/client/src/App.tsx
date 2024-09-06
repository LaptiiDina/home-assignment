import { BookLibrary } from './components/BookLibrary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {CreateBook } from './components/CreateBook';
import { UpdateBook } from './components/UpdateBook';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<BookLibrary />} />
      <Route path="/create-books" element={<CreateBook/>} />
      <Route path="/update-books" element={< UpdateBook/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
