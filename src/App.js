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
import EditProfile from "./components/profile/EditProfile.jsx"
import MyReviews from "./components/profile/MyReviews.jsx"
import PurchaseHistory from "./components/profile/PurchaseHistory.jsx"
import WishList from "./components/profile/WishList.jsx"

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/products/:categorie" element={<Categories />}/>
        <Route path="/products/:productId/details" element={<ProductDetails />}/>
        <Route path="/profile/:userId" element={<Profile />}/>
        <Route path='/profile/:userId/edit-profile' element={<EditProfile />}/>
        <Route path='/profile/:userId/purchase-history' element={<PurchaseHistory />}/>
        <Route path='/profile/:userId/wish-list' element={<WishList />}/>
        <Route path='/profile/:userId/my-reviews' element={<MyReviews />}/>
        <Route path="/cart/:userId" element={<ShoppingCart />}/>
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="/login" element={ <Login /> }/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
