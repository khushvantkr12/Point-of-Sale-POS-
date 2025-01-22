import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SiTicktick } from "react-icons/si";

export default function Receipt() {
  const navigate = useNavigate();
  const { cart, customer, clearCart } = useStore();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart?.reduce((acc, curr) => acc + curr.quantity*curr.service.price, 0));
  }, [cart]);


  useEffect(() => {
    if (!customer || cart.length === 0) {
      navigate('/');
    }
  }, [customer, cart, navigate]);

  if (!customer || cart.length === 0) return null;

  const handleDone = () => {
    clearCart();
    navigate('/');
  };

  const transactionId = 'TXN-' + Date.now().toString(36).toUpperCase();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
        <p className="text-gray-600 mt-2">Your order has been confirmed</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <p className="text-gray-600">Order #{orderNumber}</p>
          <p className="text-gray-600">Transaction ID: {transactionId}</p>
          <p className="text-gray-600">
            {date} at {time}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Customer Information</h3>
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
            
              <span> Services Purchased  <SiTicktick className="text-green-600" /></span></h3>
            {cart.map((item) => (
              <div
                key={item.service.id}
                className="flex justify-between py-2 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium">{item.service.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  ${item.service.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleDone}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Done
        </button>
      </div>
    </div>
  );
}