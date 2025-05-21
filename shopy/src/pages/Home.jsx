import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ItemCard from '../components/ItemCard';
import { fetchAllProducts } from '../store/productsSlice';

function Home() {
  const { productsData, error, loading } = useSelector(store => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productsData.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4 py-6">
      
      {loading && <p className="col-span-full text-center">Loading...</p>}

      {!loading && error && (
        <p className="col-span-full text-center text-red-500">{error}</p>
      )}

      {!loading && !error && productsData.length === 0 && (
        <p className="col-span-full text-center">No products found</p>
      )}

      {!loading && !error && productsData.length > 0 &&
        productsData.map((data) => (
          <ItemCard key={data.id} data={data} />
        ))
      }
    </div>
  );
}

export default Home;
