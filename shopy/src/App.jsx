import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";
import "./app.css"

function App() {

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/product_details/:id" element = {<ProductDetail/>}/>
        <Route path="/cart" element = {<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
