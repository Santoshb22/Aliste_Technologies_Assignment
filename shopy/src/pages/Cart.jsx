import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const allProducts = useSelector((store) => store.products?.productsData);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartTrigger, setCartTrigger] = useState(false); // to re-trigger useEffect
  const navigate  = useNavigate();


  const cartItemIds = JSON.parse(localStorage.getItem("cartItems")) || [];

  const handleDecreaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = cartItems.map(item =>
       item.id === id
       ?{...item, qty: item.qty > 1? item.qty - 1 : 1} : item)

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartTrigger(!cartTrigger); 
  }

  const handleIncreaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = cartItems.map(item =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartTrigger(!cartTrigger); 
  };

  useEffect(() => {
  const cartItemIdList = cartItemIds.map(item => item.id);

  const matchedProducts = allProducts.filter(product =>
    cartItemIdList.includes(product.id)
  );

  const matchedProductsWithQty = matchedProducts.map(product => {
    const matchedItem = cartItemIds.find(item => item.id === product.id);
    return { ...product, qty: matchedItem?.qty || 1 };
  });

  setCartProducts(matchedProductsWithQty);

  const total = matchedProductsWithQty.reduce((acc, item) => acc + item.price * item.qty, 0);
  setTotalAmount(total);
}, [allProducts, cartTrigger]);

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6 max-w-6xl mx-auto">
      
      {/* Left: List of Cart Items */}
      <div>
        <h2 className="text-xl font-bold mb-4">Cart Items</h2>
        {cartProducts.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartProducts.map(product => (
              <li 
              key={product.id} 
              className="grid gap-4 items-center bg-gray-100 p-4 rounded-lg">
                <img
                onClick={() => navigate(`/product_details/${product.id}`)}
                src={product.image} alt={product.title} className="w-20 h-20 object-contain" />
                <div>
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-green-600 font-medium">${product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecreaseQty(product.id)}
                    className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 text-xl font-bold flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-lg font-medium w-6 text-center">{product.qty}</span>
                  <button
                    onClick={() => handleIncreaseQty(product.id)}
                    className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 text-xl font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right: Amount Summary */}
      <div className="bg-gray-100 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="text-lg mb-2">Items: {cartProducts.length}</div>
        <div className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</div>
        <button disabled = {true}
        className="cursor-not-allowed mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
