import React from 'react'
import styles from './CategoriePriceFromSection.module.css'
import Countdown from 'react-countdown';
function CategoriePriceFromSection(props) {
  return (
    <section className={styles["categorie-price-from-section"]}>
        <div className={styles["categorie-price-from-section-container"]}>
            <div  style={{backgroundImage:"url('https://cdn.builder.io/api/v1/image/assets/TEMP/ce4952251bf5a704e59199dd26357e23eafac893b94772cc530dc70ddee1d5ce?placeholderIfAbsent=true')"}} className={styles["cpf-info"]}>
                <img src="" alt="" />
                <h1>{props.title}</h1>
            </div>
            <div className={styles["cpf-items"]}>
              {props.prods.map((prod)=>(
                <div className={styles["cpf-single-item"]}>
                  <div className="cpf-item-info">
                    <h3>{prod.title}</h3>
                    <p>From <br/><span>{prod.priceFrom} TND</span></p>
                  </div>
                  <img src={prod.img} alt="" />
                </div>
              ))}
            </div>
        </div>
    </section>
  )
}

export default CategoriePriceFromSection;