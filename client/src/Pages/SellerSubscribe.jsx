import React, { useState } from 'react';
import styles from './SubscriptionPage.module.css';
import {subscribeToMarketPlace} from "../services/dashboardService";
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate} from 'react-router-dom';

// import {paySubscription}
const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors,setErrors] = useState({"name":[],"cardNumber":[],"expiry":[],"cvv":[]});
  const isValidCardName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const isValidCVV = (cvv) => /^\d{3,4}$/.test(cvv);
  const isValidExpiryDate = (expiryDate) => {
    // Check if expiryDate matches the MM/YY format
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiryDate)) {
      return false;
    }
  
    // Split the expiryDate into month and year
    const [month, year] = expiryDate.split('/').map(Number);
    
    // Get the current date
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() is zero-based
    const currentYear = now.getFullYear() % 100; // Get last two digits of the year
    // Check if the expiration date is in the future
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      
      return false;
    }else{
      return true;
    }
  };
  const luhnCheck = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s+/g, '');
  
    if (cleaned.length < 13 || cleaned.length > 19) {
      return false;
    }
  
    let sum = 0;
    let shouldDouble = false;
  
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
  
    return sum % 10 === 0;
  };
  const handleNameChange = (event) => {
    setErrors({...errors,"name":[]})
    setName(event.target.value);
    if(!isValidCardName(event.target.value)){
      setErrors({...errors,name:["Card name is invalid !"]})
    }
  };

  const handleCardNumberChange = (event) => {
    setErrors({...errors,"cardNumber":[]})
    setCardNumber(event.target.value);
    if(!luhnCheck(event.target.value)){
      setErrors({...errors,"cardNumber":["Card number is invalid !"]});
    }
  };
  
  const handleExpiryChange = (e) => {
    setErrors({...errors,expiry:[]})
    let value = e.target.value;

    // Remove non-numeric characters except "/"
    value = value.replace(/[^0-9/]/g, '');

    // If the user is deleting characters, we need to handle the removal of the "/"
    if (value.length === 2 && expiry.length === 3 && expiry[2] === '/') {
      value = value.substring(0, 1);
    } else if (value.length === 2 && !value.includes('/')) {
      // Automatically add slash after two digits if it's not present
      value = `${value}/`;
    } else if (value.length > 2) {
      // Ensure the format is MM/YY
      value = `${value.slice(0, 2)}/${value.slice(3, 5)}`;
    }

    if(value.length<=5){
      setExpiry(value);
    }
    if(!isValidExpiryDate(value)){
      setErrors({...errors,expiry:["Expiry date is invalid !"]})
    }
  };
    
  const handleCvvChange = (event) => {
    setErrors({...errors,"cvv":[]})
    setCvv(event.target.value);
    if(!isValidCVV(event.target.value)){
      setErrors({...errors,cvv:["Cvv is invalid !"]})
    }
  };

  const handlePayment = async (e) => {
    console.log("payment handle")
    // setLoading(true)
    e.preventDefault();
    const paymentDetails = {
      name,
      cardNumber,
      expiry,
      cvv,
      amount: 30,
    };
    Swal.fire({
      title: "Do you want to pay your subscription?",
      showCancelButton: true,
      confirmButtonText: "Pay",
    }).then(async (result) => {
      if (result.isConfirmed) {
          await subscribeToMarketPlace()
          .then(function(e){
            setLoading(false);
            Swal.fire({
              icon: "success",
              title: "Subscribed successfully !",
              text:"Please login to continue.",
              showConfirmButton: false,
              timer: 2000
            });
            setTimeout(function(){
              window.location.href = "/auth/logout"
            },2000)
          }).catch(function(err){
              Swal.fire({
                  icon: "error",
                  title: "Oops !",
                  text: err.response.data.msg,
              });
              setLoading(false);
              });
      }
    });
  };

  return (
    <div className={styles["container"]}>
      <h2>Subscribe to Adghal</h2>
      <span>30TND/Monthly</span>
      <form onSubmit={handlePayment}>
      <ThreeDots
          visible={loading}
          height="100"
          width="100"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="overlay-spinner"
        />
        <div className={styles["container-div"]}>
          <label htmlFor="name">Name on Card:</label>
          <div className={styles["container-div"]} style={{display:"flex",flexDirection:"column"}}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <div className={styles["container-div"]}>
              {errors["name"].map((err,index)=>(
                <p style={{fontSize:"14px",color:"red"}} key={index}>{err}</p>
              ))}
            </div>
          </div>
        </div>
        <div className={styles["container-div"]}>
          <label htmlFor="cardNumber">Card Number:</label>
          <div style={{display:"flex",flexDirection:"column"}} className={styles["container-div"]}>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
            <div className={styles["container-div"]}>
              {errors["cardNumber"].map((err,index)=>(
                <p style={{fontSize:"14px",color:"red"}} key={index}>{err}</p>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles["container-div"]}>
          <label htmlFor="expiry">Expiry Date:</label>
          <div style={{display:"flex",flexDirection:"column"}} className={styles["container-div"]}>
            <input
              type="text"
              id="expiry"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              required
            />
            <div className={styles["container-div"]}>
              {errors["expiry"].map((err,index)=>(
                <p style={{fontSize:"14px",color:"red"}} key={index}>{err}</p>
              ))}
            </div>
          </div>
        </div>
        <div className={styles["container-div"]}>
          <label htmlFor="cvv">CVV:</label>
          <div style={{display:"flex",flexDirection:"column"}} className={styles["container-div"]}>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              required
            />
            <div className={styles["container-div"]}>
              {errors["cvv"].map((err,index)=>(
                <p style={{fontSize:"14px",color:"red"}} key={index}>{err}</p>
              ))}
            </div>
          </div>
        </div>
        <button type='submit'>Pay 30 TND Now</button>
      </form>
    </div>
  );
};

export default SubscriptionPage;
