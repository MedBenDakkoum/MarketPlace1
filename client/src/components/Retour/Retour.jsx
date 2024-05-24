import { React,useState } from "react";
import styles from "./retour.module.css";
import {
  useNavigate
} from "react-router-dom";
import {CButton,CForm} from '@coreui/react'
import { BsChevronLeft } from "react-icons/bs";
const Retour = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["go-back-container"]}>
      <CButton className={styles["go-back-button"]} onClick={() => navigate(-1)}><BsChevronLeft /> Retour</CButton>
    </div>
  )
}

export default Retour;
