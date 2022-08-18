import './App.css';
import {Routes, Route} from "react-router-dom"
import Navbar from './components/navbars/Navbar';
import Home from './pages/Home';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="/login" element={ <Login /> }/>
      </Routes>
    </div>
  );
}

export default App;
