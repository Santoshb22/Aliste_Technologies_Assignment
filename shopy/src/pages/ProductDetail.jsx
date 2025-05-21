import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchProductDetailsById } from '../store/productDetailsSlice';

function ProductDetail() {
  const { productDetails, loading, error } = useSelector(store => store.productDetails);
  const [buttonText, setButtonText] = useState("Add to cart");
  const { id } = useParams();
  const dispatch = useDispatch();

  const addToCartOrRemove = (id) => {
    let existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const isInCart = existingItems.find(item => item.id === id);

    if(!isInCart) {
      existingItems.push({id, qty: 1});
      localStorage.setItem("cartItems", JSON.stringify(existingItems));
      setButtonText("Remove")
    }else {
      const cartItems = existingItems.filter(item => item.id !== id);
      existingItems = cartItems;
      localStorage.setItem("cartItems", JSON.stringify(existingItems));
      alert("Product Removed from cart")
      setButtonText("Add to cart")
    }
  }

  useEffect(() => {
    if (!productDetails?.id || productDetails?.id !== Number(id)) {
      dispatch(fetchProductDetailsById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isInCart = existingCartItems.find(item => item.id === Number(id));
    setButtonText(isInCart ? "Remove" : "Add to cart");
  }, [id, buttonText])

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-8 grid md:grid-cols-2 gap-10">
      <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg">
        <img src={productDetails.image} alt={"Product"} className="h-80 object-contain" />
      </div>

      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">{productDetails.title}</h1>
        <p className="text-gray-700 text-base">{productDetails.description}</p>
        <div className="text-xl font-semibold text-green-600">
          ${productDetails.price}
        </div>
        <div className="text-yellow-500 text-sm">
          <span className="font-bold">{productDetails.rating?.rate}★</span>
          <span className="text-gray-600 ml-1">({productDetails.rating?.count} reviews)</span>
        </div>
        <button 
        onClick={() => addToCartOrRemove(productDetails.id)}
        className={`mt-4 px-6 py-2 ${buttonText === "Add to cart"? "bg-blue-600" : "bg-red-600"} text-white rounded ${buttonText === "Add to cart"? "hover:bg-blue-700" : "hover:bg-red-700"} w-max`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
