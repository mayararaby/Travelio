import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Book from './pages/book/book';
import Error from './pages/error/error';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/*" element={<Error />} />

      </Routes>
    </Router>
  </div>
  );
}

export default App;
