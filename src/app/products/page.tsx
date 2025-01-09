"use client";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { add } from "../cart/redux/cartslice";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: IProduct[] = await response.json();
        setProducts(data);
        console.log("Fetched products >>>", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product: IProduct) => {
    dispatch(add(product)); // Add product to Redux store
  };

  return (
    <div>
      <div className="flex justify-center items-center font-bold text-5xl my-5 text-blue-900">
        <h1>Products</h1>
      </div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white
             transform transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-cover"
                width={100}
                height={100}
              />
            </Link>

            <div className="p-5 flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold text-gray-800">
                Price: ${product.price}
              </p>
              <p className="text-gray-600">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-gray-600">
                <strong>Rating:</strong> {product.rating.rate} ⭐ (
                {product.rating.count} reviews)
              </p>

              <button
                onClick={() => handleAdd(product)}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Add to Cart
              </button>

              <Link href={`/products/${product.id}`}>
                <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
