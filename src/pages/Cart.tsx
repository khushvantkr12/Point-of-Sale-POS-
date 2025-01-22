import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";
import { useStore } from "../store/useStore";
import { toast } from "react-hot-toast";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity} = useStore();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart?.reduce((acc, curr) => acc + curr.quantity*curr.service.price, 0));
  }, [cart]);

  
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Browse Services
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Checkout Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map((item) => (
          <div
            key={item.service.id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.service.image}
              alt={item.service.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.service.name}</h3>
              <p className="text-gray-600">{item.service.duration}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.service.id,
                      Math.max(0, item.quantity - 1)
                    )
                  }
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.service.id, item.quantity + 1)
                   
                  }
                  className="text-gray-500 hover:text-indigo-600"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
              <span className="text-lg font-semibold">
                ${item.service.price * item.quantity}
                
              </span>
              <button
                onClick={() => {
                  removeFromCart(item.service.id);
                  toast.success("Item removed from cart");
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: <span className="text-indigo-600">${totalAmount}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
