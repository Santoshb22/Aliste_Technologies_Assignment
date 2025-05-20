import React, { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard';

function Home() {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            console.log(data);
            setProductsData(data);
        } catch (error) {
            setError("Error loading products")
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);
  return (
    <div className='grid grid-cols-6'>
        {
            loading? ("loading...") 
            : (
                productsData.length > 0? (
                    productsData.map(data => <ItemCard key={data.id} data={data}/>)
                ) : (
                    <h1>
                        {error}
                    </h1>
                )
            )
        }
    </div>
  )
}

export default Home
