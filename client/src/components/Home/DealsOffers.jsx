import React from 'react'
import styles from './DealsOffers.module.css'
import Countdown from 'react-countdown';
function DealsOffers() {
  return (
    <section className={styles["deals-offers-section"]}>
        <div className={styles["deals-offers-info-container"]}>
          <div className={styles["deals-offers-info"]}>
            <h1>Deals and offers</h1>
            <p>Best deals</p>
            <Countdown
              date={Date.now() + 999999999}
              intervalDelay={0}
              precision={3}
              renderer={props => (
                <div className={styles["timer-container"]}>
                  <div className={styles["timer-prop"]}>
                    <p>{props.days}</p>
                    <span>Days</span>
                  </div>
                  <div className={styles["timer-prop"]}>
                    <p>{props.hours}</p>
                    <span>Hours</span>
                  </div>
                  <div className={styles["timer-prop"]}>
                    <p>{props.minutes}</p>
                    <span>Min</span>
                  </div>
                  <div className={styles["timer-prop"]}>
                    <p>{props.seconds}</p>
                    <span>Sec</span>
                  </div>
                </div>
              
              )}
            />
          </div>
          <div className={styles["deals-offers-products"]}>
                <div className={styles["single-deals-offers-product"]}>
                  <img src="https://ettajer.com.tn/1/image1.jpg" alt="" />
                  <p>T shirt</p>
                  <div className={styles["price"]}>
                    <span>-25%</span>
                  </div>
                </div>
                <div className={styles["single-deals-offers-product"]}>
                  <img src="https://ettajer.com.tn/2/image2.jpg" alt="" />
                  <p>T shirt</p>
                  <div className={styles["price"]}>
                    <span>-25%</span>
                  </div>
                </div>
                <div className={styles["single-deals-offers-product"]}>
                  <img src="https://ettajer.com.tn/3/image3.jpg" alt="" />
                  <p>Art Pic</p>
                  <div className={styles["price"]}>
                    <span>-20%</span>
                  </div>
                </div>
                <div className={styles["single-deals-offers-product"]}>
                  <img src="https://ettajer.com.tn/4/image4.jpg" alt="" />
                  <p>Art Pic</p>
                  <div className={styles["price"]}>
                    <span>-20%</span>
                  </div>
                </div>
                <div className={styles["single-deals-offers-product"]}>
                  <img src="https://ettajer.com.tn/5/image5.jpg" alt="" />
                  <p>Art Pic</p>
                  <div className={styles["price"]}>
                    <span>-15%</span>
                  </div>
                </div>
          </div>
        </div>
    </section>
  )
}

export default DealsOffers