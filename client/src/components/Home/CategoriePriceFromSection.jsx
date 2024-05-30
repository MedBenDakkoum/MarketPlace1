import React from 'react'
import styles from './CategoriePriceFromSection.module.css'
import { useNavigate } from 'react-router-dom';

function CategoriePriceFromSection(props) {
  const lang = localStorage.getItem("lang");
  const navigate = useNavigate();

  return (
    <section className={styles["categorie-price-from-section"]}>
        <div className={styles["categorie-price-from-section-container"]}>
            <div  style={{backgroundImage:"url('"+props.img+"')"}} className={styles["cpf-info"]}>
              <div className={styles["shadow-cat"]}></div>
                <h1>{props.title[lang]}</h1>
            </div>
            <div className={styles["cpf-items"]}>
              {props.prods.map((prod,indx)=>(
                <div key={indx} onClick={(e)=>{navigate(prod.link)}} className={styles["cpf-single-item"]}>
                  <div className="cpf-item-info" style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <h3>{prod.title[lang]}</h3>
                    <p><br/><span>{prod.price.toFixed(2)} TND</span></p>
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