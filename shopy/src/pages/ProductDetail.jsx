import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchProductDetailsById } from '../store/productDetailsSlice';
import { addOrRemoveItem } from '../store/cartSlice';

function ProductDetail() {
  // Extracting product details, loading status, and error from Redux store
  const { productDetails, loading, error } = useSelector(store => store.productDetails);

  // Local state to manage dynamic button text
  const [buttonText, setButtonText] = useState("Add to cart");

  // Extract product ID from route params
  const { id } = useParams();

  // Get cart items from Redux store
  const cartItems = useSelector(store => store.cart.items);

  const dispatch = useDispatch();

  // Fetch product details if not already loaded or if ID has changed
  useEffect(() => {
    if (!productDetails?.id || productDetails?.id !== Number(id)) {
      dispatch(fetchProductDetailsById(id));
    }
  }, [id]);

  // Update button text based on whether the item exists in the cart
  useEffect(() => {
    const isInCart = cartItems.find(item => item?.id === Number(id));
    setButtonText(isInCart ? "Remove" : "Add to cart");
  }, [id, cartItems])

  // Show loading or error UI states
  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-8 grid md:grid-cols-2 gap-10">

      {/* Left: Product Image */}
      <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg">
        <img src={productDetails.image} alt={"Product"} className="h-80 object-contain" />
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">{productDetails.title}</h1>
        <p className="text-gray-700 text-base">{productDetails.description}</p>
        <div className="text-xl font-semibold text-green-600">
          ${productDetails.price}
        </div>
        <div className="text-yellow-500 text-sm">
          <span className="font-bold">{productDetails.rating?.rate}★</span>
          <span className="text-gray-600 ml-1">Rated by {productDetails.rating?.count} people</span>
        </div>

        {/* Add or Remove from Cart Button */}
        <button 
        onClick={() => dispatch(addOrRemoveItem(productDetails.id))}
        className={`mt-4 px-6 py-2 cursor-pointer ${buttonText === "Add to cart"? "bg-blue-600" : "bg-red-600"} text-white rounded ${buttonText === "Add to cart"? "hover:bg-blue-700" : "hover:bg-red-700"} w-max`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
