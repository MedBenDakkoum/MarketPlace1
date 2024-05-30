import React, { useState, useEffect, useContext } from "react";
import { Context } from '../ContextStore';
import styles from "../components/Cart/Cart.module.css";
import { useNavigate } from "react-router-dom";
import { getCart, deleteFromCart, makeOrder, getAddress } from "../services/userData";
import { BsXSquareFill } from "react-icons/bs";
import { CButton } from '@coreui/react';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem("lang");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { userData, setUserData } = useContext(Context);
  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    refresh: true
  });
  const [dataRows, setDataRows] = useState([]);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleDeleteAllFromCart = async (e) => {
    Swal.fire({
      title: t("remove_all_items"),
      showCancelButton: true,
      confirmButtonText: t("remove"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFromCart({ cartItemId: "all" })
          .then(function (e) {
            if (data.length !== 1) {
              setRefresh(!refresh);
            } else {
              setDataRows(new Array());
            }
            setAlert({ msg: t("items_deleted_success"), type: "success", refresh: !alert.refresh });
          }).catch(function (err) {
            setAlert({ msg: t("items_deleted_error"), type: "fail", refresh: !alert.refresh });
          });
      }
    });
  };

  const handleDeleteFromCart = async (e) => {
    let id = "";
    if (e.target == e.currentTarget) {
      id = e.target.getAttribute("id");
    } else {
      id = e.target.parentNode.getAttribute("id");
    }
    Swal.fire({
      title: t("remove_item"),
      showCancelButton: true,
      confirmButtonText: t("remove"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFromCart({ cartItemId: id })
          .then(function (e) {
            if (data.length !== 1) {
              setRefresh(!refresh);
            } else {
              setDataRows(new Array());
            }
            setAlert({ msg: t("item_deleted_success"), type: "success", refresh: !alert.refresh });
          }).catch(function (err) {
            setAlert({ msg: t("item_deleted_error"), type: "fail", refresh: !alert.refresh });
          });
      }
    });
  };

  const handleCheckOut = (e) => {
    setConfirmOrder(true);
  };

  const handleExitCheckout = (e) => {
    setConfirmOrder(false);
  };

  useEffect(function () {
    async function init() {
      setLoading(true);
      await getCart().then((cart) => {
        if (cart.notLoggedIn) {
          Swal.fire({
            title: t("please_login"),
            showCancelButton: true,
            confirmButtonText: t("login"),
          }).then(async (result) => {
            if (result.isConfirmed) {
              navigate("/auth/login");
            } else {
              navigate("/");
            }
          });
        } else {
          setData(cart);
        }
      });
      await getAddress().then((addressInfo) => {
        setAddress(addressInfo);
      });

    }
    init();
    setPaymentMethod("onDelivery");
    setLoading(false);
  }, [refresh, setRefresh]);

  const getTotal = async () => {
    return new Promise(async (resolve, reject) => {
      let s = 0;
      let i = 0;
      data.forEach((e) => {
        s += parseFloat(e.info.price * e.quantity);
        if (i == data.length - 1) {
          resolve(s);
        }
        i++;
      });
    });
  };

  const handleBuyNow = async (e) => {
    setLoading(true);
    if (paymentMethod !== "") {
      await makeOrder({ paymentMethod: paymentMethod }, lang).then(function (e) {
        setLoading(false);
        setDataRows([]);
        setConfirmOrder(false);
        setAlert({ msg: t("order_success"), type: "success", refresh: !alert.refresh });
        Swal.fire({
          icon: "success",
          title: t("order_success"),
          text: t("order_verify_message"),
          showConfirmButton: true,
        });
        setRefresh(!refresh);
      }).catch(function (e) {
        setLoading(false);
        setAlert({ msg: t("order_error"), type: "fail", refresh: !alert.refresh });
      });
    } else {
      setLoading(false);
      setAlert({ msg: t("select_payment_method"), type: "fail", refresh: !alert.refresh });
    }
  };

  useEffect(function () {
    getTotal().then((total) => {
      setSubTotalPrice(parseFloat(total).toFixed(2));
      setTotalPrice((parseFloat(total) + 7).toFixed(2));
    });
  }, [data, setData]);

  return (
    <main className={styles["section-cart-container"]}>
      {!loading ?
        <>
          {confirmOrder ?
            <div className={styles["confirm-order-container"]}>
              <div className={styles["confirm-order"]}>
                <div className={styles["cart-total-data"]}>
                  <div className={styles["exit-check-out"]}>
                    <BsXSquareFill onClick={handleExitCheckout} style={{ color: "#FA3434", fontSize: "24px", cursor: "pointer" }} />
                  </div>
                  <p style={{ maxWidth: "100%" }}><span>{t("total")}:</span> {totalPrice} TND</p>
                  <div className={styles["cart-address-info"]}>
                    <p><span>{t("address1")}:</span> {address?.line1}</p>
                    <p><span>{t("address2")}:</span> {address?.line2}</p>
                    <p><span>{t("country")}:</span> {address?.country}</p>
                    <p><span>{t("state")}:</span> {address?.state}</p>
                    <p><span>{t("city")}:</span> {address?.city}</p>
                    <p><span>{t("zip_code")}:</span> {address?.zipCode}</p>
                    <a onClick={(e) => { navigate("/cd") }} style={{ color: "#007bff", cursor: "pointer" }}>{t("change_address")}</a>
                  </div>
                  <CButton type="button" onClick={handleBuyNow}>{t("buy_now")}</CButton>
                </div>
              </div>
            </div>
            :
            ""
          }
          {data?.length > 0 ?
            <>
              <h1>{t("my_cart")} ({data.length})</h1>
              <div className={styles["cart-container"]}>
                <div className={styles["cart-items"]}>
                  {data.map((item) => (
                    <div className={styles["single-cart-item"]} key={item.itemId}>
                      <div className={styles["item-img-info"]}>
                        <img src={item.info.img} alt="" />
                        <div className={styles["single-cart-item-info"]}>
                          <h5>{item.info.name[lang]}</h5>
                          <p>
                            {item?.attributes ?
                              Object.keys(item?.attributes).map((attr) => (
                                attr + " : " + item.attributes[attr] + ", "
                              ))
                              : ""}
                          </p>
                          <button id={item.itemId} onClick={handleDeleteFromCart}>{t("remove")}</button>
                        </div>
                      </div>
                      <div className={styles["item-price-quantity"]}>
                        <h5>{item?.info?.price.toFixed(2)} TND</h5>
                        <p><span>{t("quantity")}</span> <span>{item.quantity}</span></p>
                      </div>
                    </div>
                  ))}
                  <div className={styles["single-cart-item"]}>
                    <button onClick={(e) => { navigate("/") }}>{t("back_to_shop")}</button>
                    <button onClick={handleDeleteAllFromCart}>{t("remove_all")}</button>
                  </div>
                </div>
                <div className={styles["cart-checkout"]}>
                  <div className={styles["cart-checkout-info"]}>
                    <p><span>{t("subtotal")}:</span><span>{subTotalPrice} TND</span></p>
                    <p><span>{t("delivery")}:</span><span>7 TND</span></p>
                    <p><span>{t("tax")}:</span><span>0 TND</span></p>
                    <div className={styles["cart-checkout-total-line"]}></div>
                    <p className={styles["total"]}><span>{t("total")}:</span><span>{totalPrice} TND</span></p>
                    <button onClick={handleCheckOut}>{t("checkout")}</button>
                  </div>
                </div>
              </div>
            </>
            :
            <div className={styles["empty-cart"]}>
              <img src="/assets/images/emptycart.png" alt="" />
              <h4>{t("cart_empty")}</h4>
              <p>{t("cart_empty_msg")}</p>
            </div>
          }
          <div className={styles["free-delivery-banner"]}>
            <div className={styles["top-free-del"]}>
              <p>{t("free_delivery_msg")}</p>
            </div>
            <button onClick={(e) => { navigate("/") }} className={styles["shop-now"]}>
              {t("shop_now")}
            </button>
          </div>
        </>
        :
        <div className="spinner">
          <Spinner animation="border" />
        </div>
      }
    </main>
  );
};

export default Cart;
