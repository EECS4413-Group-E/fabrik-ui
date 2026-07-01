
import { useEffect, useState } from 'react';
import type { Product } from '../models/Product';
import { fetchProducts } from '../Api';


export default function ProductPage(){

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const getProducts = async function(){
            try {
                setLoading(true);
                setError(null);
                const p = await fetchProducts();
                setProducts(p);
            } catch {
                setError("Failed to fetch products.")
            } finally{
                setLoading(false);
            }
        }
        getProducts();
    }, [])

    return <div>
        <h1>Products Page</h1>
        {loading ? <p>Loading...</p>: 
         error ? <p>Error: {error}</p> : 
         products.length === 0 ? <p>No Products to display</p> :
         products.map((product) => (
         <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <p>{product.category}</p>
          <p>{product.color}</p>
          <p>{product.size}</p>
           <p>{product.available ? 'Available' : 'Out of stock'}</p>
        </div>
      ))}
    </div>
}