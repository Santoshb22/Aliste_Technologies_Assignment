import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { MdDeleteOutline } from "react-icons/md";
import { increaseQty, decreaseQty, deleteFromCart } from '../store/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart item IDs and all product data from Redux store
  const cartItems = useSelector(state => state.cart.items);
  const allProducts = useSelector(state => state.products?.productsData || []);

  // Local state to hold full cart product details and total cost
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Whenever cart or product data changes, update cartProducts and totalAmount
  useEffect(() => {
    const cartItemIds = cartItems.map(item => item.id); // Get list of item IDs from cart

    // Find full product data that matches cart item IDs
    const matchedProducts = allProducts.filter(product =>
      cartItemIds.includes(product.id)
    );

    // Add quantity info from cart to matched product data
    const matchedProductsWithQty = matchedProducts.map(product => {
      const matchedItem = cartItems.find(item => item.id === product.id);
      return { ...product, qty: matchedItem?.qty || 1 };
    });

    // Update local state with products in the cart
    setCartProducts(matchedProductsWithQty);

    // Calculate total amount
    const total = matchedProductsWithQty.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setTotalAmount(total);
  }, [allProducts, cartItems]);

 // Handle decreasing item quantity
  const handleDecreaseQty = (id) => {
    dispatch(decreaseQty(id));
  };

  // Handle increasing item quantity
  const handleIncreaseQty = (id) => {
    dispatch(increaseQty(id));
  };

  // Handle removing item from cart
  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6 max-w-6xl mx-auto">

      {/* Left Side: List of Cart Items */}
      <div>
        <h2 className="text-xl font-bold mb-4">Cart Items</h2>
        {cartProducts.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartProducts.map(product => (
              <li
                key={product.id}
                className="grid gap-4 items-center bg-gray-100 p-4 rounded-lg"
              >

                {/* Product Image (click to navigate to product details) */}
                <img
                  onClick={() => navigate(`/product_details/${product.id}`)}
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-contain cursor-pointer"
                />
                <div>
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-green-600 font-medium">${product.price}</p>
                </div>

                {/* Quantity Controls */}
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
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="w-8 h-8 rounded-full bg-red-300 hover:bg-red-400 text-xl font-bold flex items-center justify-center"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Side: Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="text-lg mb-2">Items: {cartProducts.length}</div>
        <div className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</div>

       {/* Checkout Button (disabled for now) */}
        <button
          disabled={true}
          className="cursor-not-allowed mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
