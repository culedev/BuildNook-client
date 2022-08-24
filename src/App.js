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
import Error from "./pages/Error.jsx"
import NotFound from "./pages/NotFound.jsx"
import Success from './components/Payment/Success';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path="/products/:categorie" element={ <Categories /> }/>
        <Route path="/products/:productId/details" element={ <ProductDetails /> }/>
        <Route path="/profile/:userId/:display" element={ <IsPrivate> <Profile /> </IsPrivate> }/>
        <Route path="/cart/:userId" element={ <IsPrivate> <ShoppingCart /> </IsPrivate> }/>
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path='/paymentsuccess' element={<IsPrivate><Success /></IsPrivate>}/>
        {/* Error Routes */}
        <Route path="/error" element={ <Error /> }/>
        <Route path="/*" element={ <NotFound />}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
