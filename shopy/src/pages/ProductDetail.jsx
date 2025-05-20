import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function ProductDetail() {
    const [product, setProduct] = useState([]);
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json();
            setProduct(data);
        } catch (error) {
            console.log("Error:", error);
            setError("Failed to load product");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [id])
  return (
    <div className="max-w-5xl mx-auto p-4 mt-8 grid md:grid-cols-2 gap-10">
    {/* Image */}
    <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg">
      <img src={product.image} alt={"Product image"} className="h-80 object-contain" />
    </div>

    {/* Details */}
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>

      <p className="text-gray-700 text-base">{product.description}</p>

      <div className="text-xl font-semibold text-green-600">
        ₹{product.price}
      </div>

      <div className="text-yellow-500 text-sm">
        <span className="font-bold">{product.rating?.rate}★</span>
        <span className="text-gray-600 ml-1">({product.rating?.count} reviews)</span>
      </div>

      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-max">
        Add to Cart
      </button>
    </div>
  </div>
  )
}

export default ProductDetail
