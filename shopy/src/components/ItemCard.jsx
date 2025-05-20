import React from 'react';
import { useNavigate } from 'react-router';

function ItemCard({ data }) {
    const navigate = useNavigate();
  if (!data) return null;

  const handleItemClick = (id) => {
    navigate(`/product_details/${id}`)
  }

  return (
    <div 
    onClick={() => handleItemClick(data.id)}
    className="card w-60 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 m-4 border border-gray-200 cursor-pointer">
      <div className="h-60 flex items-center justify-center bg-gray-100">
        <img
          src={data.image}
          alt="Product"
          className="object-contain h-full p-4"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-48">
        <h2 className="text-sm font-semibold mb-2 line-clamp-2">{data.title}</h2>

        <div className="flex items-center text-yellow-500 text-sm mb-1">
          <span className="font-bold mr-1">{data.rating?.rate}★</span>
          <span className="text-gray-600">({data.rating?.count})</span>
        </div>

        <div className="text-lg font-bold text-green-600 mt-auto">
          ₹{data.price}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
