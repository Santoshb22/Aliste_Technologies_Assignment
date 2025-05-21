import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ItemCard from '../components/ItemCard';
import { fetchAllProducts } from '../store/productsSlice';

function Home() {
  // Accessing state values from Redux store
  const { productsData, error, loading } = useSelector(store => store.products);
  const dispatch = useDispatch();

  // Fetch all products only once when component mounts
  useEffect(() => {
    if (productsData.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, []);

  return (
    // Responsive grid layout: 1 to 6 columns depending on screen size
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4 py-6">
      
      {/* Loading state message */}
      {loading && <p className="col-span-full text-center">Loading...</p>}

      {/* Error state message */}
      {!loading && error && (
        <p className="col-span-full text-center text-red-500">{error}</p>
      )}

      {/* No products found message */}
      {!loading && !error && productsData.length === 0 && (
        <p className="col-span-full text-center">No products found</p>
      )}

      {/* Render each product using ItemCard component */}
      {!loading && !error && productsData.length > 0 &&
        productsData.map((data) => (
          <ItemCard key={data.id} data={data} />
        ))
      }
    </div>
  );
}

export default Home;
