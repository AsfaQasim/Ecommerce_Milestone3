"use client";
import Loader from "@/app/component/loader";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "@/app/cart/redux/cartslice";

export interface IProduct {
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

const Product = ({ params }: { params: { product: string } }) => {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch(); // Properly initialize useDispatch

  const handleAdd = (product: IProduct) => {
    dispatch(add(product)); // Add product to Redux store
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.product}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [params.product]);

  if (isLoading) {
    return <Loader />;
  }

  if (!productData) {
    return <div>Error loading product data</div>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={productData.image}
            width={800}
            height={800}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-2xl title-font text-blue-900 tracking-widest">
              {productData.title}
            </h2>

            <div className="flex mb-4">
              <span className="flex items-center">
                {/* Ratings and other product details */}
                {[...Array(4)].map((_, index) => (
                  <svg
                    key={index}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">{productData.rating.rate}</span>
              </span>
            </div>
            <p className="leading-relaxed text-blue-900">{productData.description}</p>
            <br />
            <p className="leading-relaxed text-blue-900 font-bold">Price: ${productData.price}</p>
            {/* Add to Cart Button */}
            <button
  onClick={() => {
    handleAdd(productData);
    alert("Item added to the cart");
  }}
  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
>
  Add To Cart
</button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
