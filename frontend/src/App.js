import './App.css';
import TabelVirtualShelfs from './components/VirtualShelfs';
import VirtualShelfForm from "./components/VirtualShelfForm";
import TabelBooks from './components/Books';
import BookForm from "./components/BookForm";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TabelVirtualShelfs />} />
          <Route path="/formularVirtualShelf" element={<VirtualShelfForm />} />
          <Route path="/Books" element={<TabelBooks />} />
          <Route path="/formularBook" element={<BookForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
