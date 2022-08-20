// Styles
import './App.css';
import Footer from './components/navbars/Footer';
// Routes
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
import IsPrivate from "./components/isPrivate"

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/products/:categorie" element={<Categories />}/>
        <Route path="/products/:productId/details" element={<ProductDetails />}/>
        <Route path="/profile/:userId/:display" element={<IsPrivate><Profile /></IsPrivate>}/>
        <Route path="/cart/:userId" element={<IsPrivate><ShoppingCart /></IsPrivate>}/>
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="/login" element={ <Login /> }/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
