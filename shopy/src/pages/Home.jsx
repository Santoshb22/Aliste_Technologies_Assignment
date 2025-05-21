import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ItemCard from '../components/ItemCard';
import { fetchAllProducts } from '../store/productsSlice';

function Home() {
  // Accessing state from Redux store
  const { productsData, error, loading } = useSelector(store => store.products);

  // useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Fetch products only if not already available in the store
  useEffect(() => {
    if (productsData.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [productsData, dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4 py-6">
      
       {/* Show loading state */}
      {loading && <p className="col-span-full text-center">Loading...</p>}

       {/* Show error if fetching products failed */}
      {!loading && error && (
        <p className="col-span-full text-center text-red-500">{error}</p>
      )}
      {/* Show fallback if no products are found */}
      {!loading && !error && productsData.length === 0 && (
        <p className="col-span-full text-center">No products found</p>
      )}

        {/* Render the list of product cards in a responsive grid layout */}
      {!loading && !error && productsData.length > 0 &&
        productsData.map((data) => (
          <ItemCard key={data.id} data={data} />
        ))
      }
    </div>
  );
}

export default Home;
