"use client";
import React from "react";
import { remove } from "./redux/cartslice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "./redux/store";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Cartpage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const handleRemove = (id: number) => {
    dispatch(remove(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-900">Your Cart</h3>
      <div className="space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 space-y-4 md:space-y-0 md:space-x-4"
            >
              {/* Image Section */}
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  height={120}
                  width={120}
                  className="rounded-md object-contain"
                />
              </div>

              {/* Content Section */}
              <div className="flex-grow text-center md:text-left">
                <h5 className="text-lg md:text-xl font-semibold text-gray-800">{item.title}</h5>
                <h5 className="text-md md:text-lg font-medium text-gray-600 mt-2">${item.price}</h5>
              </div>

              {/* Button Section */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm md:text-base"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">
            <h4 className="text-xl md:text-2xl font-semibold">Your cart is empty!</h4>
            <p className="mt-2">Add items to your cart to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cartpage;
