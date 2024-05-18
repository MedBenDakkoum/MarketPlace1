import React, { useState } from 'react';
import styles from './SubscriptionPage.module.css';
// import {paySubscription}
const SubscriptionPage = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handlePayment = () => {
    const paymentDetails = {
      name,
      cardNumber,
      expiry,
      cvv,
      amount: 30,
    };
    fetch('/api/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Payment successful:', data);
        alert('Payment successful! You are now subscribed to Premium.');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Payment failed. Please try again.');
      });
  };

  return (
    <div className={styles["container"]}>
      <h2>Subscribe to Adghal</h2>
      <span>30TND/Monthly</span>
      <form>
        <div>
          <label htmlFor="name">Name on Card:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expiry">Expiry Date:</label>
          <input
            type="text"
            id="expiry"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={handleCvvChange}
            required
          />
        </div>
        <button onClick={handlePayment}>Pay 30 TND Now</button>
      </form>
    </div>
  );
};

export default SubscriptionPage;
