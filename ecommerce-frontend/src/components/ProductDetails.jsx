import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative w-full md:w-1/2 border-card-classy rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg hover:scale-105 transform transition-transform duration-500 ease-in-out"
          />
        </div>
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-800 font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <button className="bg-gradient-to-r from-gray-800 to-black text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 ease-in-out">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
