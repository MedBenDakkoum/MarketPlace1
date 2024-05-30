import { React } from "react";
import styles from "./retour.module.css";
import {
  useNavigate
} from "react-router-dom";
import {CButton} from '@coreui/react'
import { BsChevronLeft } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

const Retour = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles["go-back-container"]}>
      <CButton className={styles["go-back-button"]} onClick={() => navigate(-1)}><BsChevronLeft />{t('Retour')}</CButton>
    </div>
  )
}

export default Retour;
