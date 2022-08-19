// Styles
import './App.css';
import {Routes, Route} from "react-router-dom"
// PAGES AND COMPONENTS 
import Navbar from './components/navbars/Navbar';
import Home from './pages/Home';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Categories from "./pages/Products/Categories.jsx"
import ProductDetails from "./pages/Products/ProductDetail.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart.jsx"
import Footer from './components/navbars/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/:categorie" element={<Categories />}/>
        <Route path="/:productId/details" element={<ProductDetails />}/>
        <Route path="/profile/:userId" element={<Profile />}/>
        <Route path="/cart/:userId" element={<ShoppingCart />}/>
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="/login" element={ <Login /> }/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
