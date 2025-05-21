import React from 'react';
import { useNavigate } from 'react-router'; // Hook for programmatic navigation

function ItemCard({ data }) {
  const navigate = useNavigate(); // Used to navigate to product details page

  // If no data is passed, don't render anything
  if (!data) return null;

  // Function to handle click on the item card
  const handleItemClick = (id) => {
    navigate(`/product_details/${id}`); // Navigate to product details using product ID
  };

  return (
    <div
      onClick={() => handleItemClick(data.id)}
      className="w-full max-w-xs bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 m-auto cursor-pointer border border-gray-200"
    >
      {/* Product Image Section */}
      <div className="h-60 flex items-center justify-center bg-gray-100">
        <img
          src={data.image}
          alt="Product"
          className="object-contain h-full p-4"
        />
      </div>

      {/* Product Information Section */}
      <div className="p-4 flex flex-col justify-between h-48">

        <h2 className="text-sm font-semibold mb-2 line-clamp-2">{data.title}</h2>

        {/* Rating and review count */}
        <div className="flex items-center text-yellow-500 text-sm mb-1">
          <span className="font-bold mr-1">{data.rating?.rate}★</span>
          <span className="text-gray-600">Rated by {data.rating?.count} people</span>
        </div>
        
        {/* Product Price */}
        <div className="text-lg font-bold text-green-600 mt-auto">
          ${data.price}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
