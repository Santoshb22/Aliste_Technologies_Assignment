// Importing necessary components from react-router-dom for routing
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";  // Home page component
import Cart from "./pages/Cart";  // Cart page component
import ProductDetail from "./pages/ProductDetail";  // Product details page component
import Header from "./components/Header";  // Header component (likely contains navigation)
import "./app.css";  // Global CSS styles

function App() {

  return (
    // BrowserRouter wraps the entire app and enables client-side routing
    <BrowserRouter>
    <Header/>{/* Header displayed on all pages */}

      {/* Routes component defines route paths and the components to render */}
      <Routes>
        {/* Route for homepage */}
        <Route path="/" element= {<Home/>} />
        {/* Route for product detail page with dynamic product id param */}
        <Route path="/product_details/:id" element = {<ProductDetail/>}/>
        {/* Route for cart page */}
        <Route path="/cart" element = {<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
