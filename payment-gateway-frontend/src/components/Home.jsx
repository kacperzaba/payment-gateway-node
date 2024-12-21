import React, { useEffect, useState } from 'react';
import pic from "../assets/chocolate.png";

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  const displayAmount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * displayAmount).toFixed(2);
  return numberFormat.format(total);
};

const Home = () => {
  const itemName = "Ferrero Rocher";
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch('https://d96c-91-150-177-233.ngrok-free.app/api/config', {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      });
      const { data } = await response.json(); 
      setAmount(data.unitAmount);
      setCurrency(data.currency);
    };
    fetchConfig();
  }, []);

  const handleCheckout = async () => {
    const response = await fetch(
      "https://d96c-91-150-177-233.ngrok-free.app/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    );
  
    const { data } = await response.json();
    console.log(data);
    if (data?.url) {
      window.location.href = data.url; 
    } else {
      console.error("Failed to create checkout session");
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="text-center font-raleway w-full max-w-5xl mx-auto my-6">
        <div className="font-extrabold text-transparent text-6xl my-10 bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-800">
          Chocolate Corner
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center mx-auto w-full my-16 border-2 bg-[#fcf6f6] border-slate-100 shadow-md py-4">
        <div className="flex lg:justify-end justify-center items-center mx-auto my-24 w-full lg:w-6/12">
          <img src={pic} alt="Chocolate" />
        </div>
        <div className="flex flex-col lg:w-6/12 w-full py-8">
          <div className="text-4xl font-bold text-yellow-700">
            {itemName}
          </div>
          <div className="text-3xl font-semibold my-6 text-slate-600">
            Price: {formatPrice({ amount, currency, quantity: 1 })}
          </div>
          <small className="mt-10 mb-3 font-semibold">Add Quantity</small>

          <div className="quantity-setter">
            <button
              className="increment-btn"
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
              type="button"
            >
              -
            </button>
            <input
              type="number"
              id="quantity-input"
              min="1"
              max="10"
              value={quantity}
              name="quantity"
              readOnly
            />
            <button
              className="increment-btn"
              disabled={quantity === 10}
              onClick={() => setQuantity(quantity + 1)}
              type="button"
            >
              +
            </button>
          </div>
          <p className="sr-legal-text">Number of copies (max 10)</p>
          <button onClick={handleCheckout} role="link" id="submit">
            Buy {formatPrice({ amount, currency, quantity })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
