import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import About from './pages/About/about';
import Contact from './pages/Contact/contact';
import Signup from './pages/Signup/signup';
import Signin from './pages/Signin/signin';

const App = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-logo">✨ MyApp</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/signin" className="nav-link">Sign In</Link>
            <Link to="/signup" className="nav-link-btn">Sign Up</Link>
          </div>
        </div>
      </nav>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MyApp — All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;