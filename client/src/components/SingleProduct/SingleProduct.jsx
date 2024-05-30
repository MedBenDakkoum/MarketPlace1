import React,{useState,useContext,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {getProductFullInfo,getReviews} from '../../services/productData'
import { Spinner } from 'react-bootstrap';
import { CForm,CButton, CFormInput,CFormTextarea} from '@coreui/react';
import ImagesViewer from "./ImagesViewer";
import {addToCart,addReview,removeReview} from '../../services/userData'
import Error404 from "../../Pages/Error404";
import styles from "./Product.module.css";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2';
import { Context } from "../../ContextStore";
import ReactStars from "react-rating-stars-component";
import {BsFillStarFill, BsXSquareFill} from "react-icons/bs";
import moment from 'moment';
import { useTranslation } from 'react-i18next';

function SingleProduct() {
    const lang = localStorage.getItem("lang");
    const params = useParams();
    const navigate= useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [data,setData] = useState({});
    const [attributes,setAttributes] = useState({});
    const [selectedAttributes,setSelectedAttributes] = useState({});
    const [review,setReview] = useState({
        stars:0,
        text:""
    })
    const [reviews,setReviews]= useState([]);
    const [cart,setCart] = useState({
        quantity:1,
        totalPrice:0,
    });
    const { userData } = useContext(Context);
    useEffect(function(){
        async function init(){
            setLoading(true);
            await getProductFullInfo(params.id)
            .then(function(prodData){
                setData({...prodData}); 
                setCart({...cart,totalPrice:prodData?.product?.newPrice || 0})
                setLoading(false);
                let i = 0 ;
                let attrs = {}
                prodData?.initialProduct?.attributes.forEach(function(singleAttr){
                    attrs[singleAttr.name[lang]] = [];
                    singleAttr.values.forEach(function(sV){
                        attrs[singleAttr.name[lang]].push(sV[lang]);
                    })
                    if(i==prodData?.initialProduct?.attributes?.length-1){
                        setAttributes({...attrs});
                    }
                    i++;
                })
                //setAttributes({...data.initialProducts.attributes})
                let sA = {}
                Object.keys(attributes).map((attr)=>{
                    sA[attr]=attributes[attr][0];
                });
                setSelectedAttributes({...sA})
            });
            await getReviews(params.id).then(function(rslt){
                setReviews(rslt);
            })
        }
        init();
    },[]);
    const handleChangeCart = (e)=>{
        e.preventDefault();
        if(e.target.value==""){
            setCart({totalPrice:data.product.newPrice});
        }else if(!isNaN(e.target.value)){
            setCart({quantity:e.target.value,totalPrice:data.product.newPrice*parseInt(e.target.value)});
        }
    }
    const handleAddToCart = async (e)=>{
        setLoading(true);
        e.preventDefault();
        let newData = {id:params.id,attributes:selectedAttributes,quantity:parseInt(cart.quantity)};
        await addToCart(newData)
        .then(function(rslt){
            Swal.fire({
                icon: "success",
                title: t("Added"),
                showConfirmButton: false,
                timer: 1000
            });
            setLoading(false);
        }).catch(function(err){
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: t("AddedErr"),
            });
            setLoading(false);
        });
    }
    const handleChangeAttributes = (e)=>{
        setSelectedAttributes({...selectedAttributes,[e.target.name]:e.target.value});
        console.log(userData);
    }
    const ratingChanged = (newRating) => {
        setReview({...review,stars:newRating});
      };
    const handleChangeReviewText = (e)=>{
        setReview({...review,text:e.target.value});    
    }
    const handleAddReview = async (e)=>{
        e.preventDefault();
        await addReview(params.id,review)
        .then(function(rslt){
            Swal.fire({
                icon: "success",
                title: "Added Review !",
                showConfirmButton: false,
                timer: 1000
            });
            setLoading(false);
        }).catch(function(err){
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: "Error while adding a new review!",
            });
            setLoading(false);
        });
    }
    const handleRemoveReview = async (e)=>{
        let id=""
        if(e.target==e.currentTarget){
            id = e.target.getAttribute("id");
        }else{
            id = e.target.parentNode.getAttribute("id");
        }
        Swal.fire({
            title: t("Do you want to remove your review?"),
            showCancelButton: true,
            confirmButtonText: t("Remove"),
          }).then(async (result) => {
            if (result.isConfirmed) {
                await removeReview(id)
                .then(function(e){
                    Swal.fire({
                        icon: "success",
                        title: t("ReviewRemovedMsg"),
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setLoading(false);
                }).catch(function(err){
                    Swal.fire({
                        icon: "error",
                        title: "Oops !",
                        text: t("reviewRemoveErrorMsg"),
                    });
                    setLoading(false);
                    });
            }
          });
    }
    return (<>
        {!loading? 
        <>
        {data?.initialProduct?.name?
        <>
            <div className={styles["single-product-container"]}>            
                <div className={styles["single-product-info"]}>
                    <ImagesViewer imgs={data?.product?.images}/> 
                    <div className={styles["single-product-info-container"]}>
                        <div className={styles["product-tags"]}>
                            <p>{data?.initialProduct?.category}</p>
                        </div>
                        <div className={styles["product-name"]}>
                            <h2>{data?.initialProduct?.name[lang]}</h2>
                        </div>
                        <div className={styles["store-name"]}>
                            <p>{t("Store")}: <span onClick={function(e){navigate("/s/"+data?.store?.link)}} style={{cursor:"pointer"}}>{data?.store?.title}</span></p>
                        </div>
                        <div className={styles["product-price"]}>
                            <span>{t("Price")}:</span><p>{data?.product?.newPrice.toFixed(2)} TND</p>
                        </div>
                        <div className={styles["product-attributes"]}>
                            {Object.keys(attributes)?.map((e,indexAttr)=>(
                                <div key={indexAttr} className={styles["single-product-attribute"]}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{e}</InputLabel>
                                        <Select
                                        name={e}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedAttributes[e]}
                                        label={e}
                                        onChange={handleChangeAttributes}
                                        >
                                            {attributes[e]?.map((a,indexMenu)=>(
                                                <MenuItem key={indexMenu} value={a}>{a}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            ))}
                        </div>
                        <div className={styles["product-info"]}>
                            <h5>{t("Description")}:</h5>
                            <p className={styles['product-desc']}>{data?.initialProduct?.description[lang]}</p>
                        </div>
                    </div>
                </div>
                <CForm className={styles["single-product-add-to-cart"]} onSubmit={handleAddToCart}>
                        <div className={styles["add-to-cart-product-price"]}>
                                <p>{data?.product?.newPrice.toFixed(2)} TND</p>
                        </div>
                        <div className={styles["add-to-cart-product-attributes"]}>
                            {Object.keys(selectedAttributes)?.map((e,indexSAtrr)=>{
                                return(
                                    <h4 key={indexSAtrr}>
                                        {e}: {selectedAttributes[e]}
                                    </h4>
                            )})}
                        </div>
                        <div className={styles["add-to-cart-product-stock"]}>
                            {data?.initialProduct?.quantity>0?
                                <p style={{color:"rgb(0, 184, 0)"}}>{t("In Stock")}</p>
                            :
                                <p style={{color:"red"}}>{t("Out of Stock")}</p>
                                }
                        </div>
                        {data?.initialProduct?.quantity>0?
                            <div className={styles["add-to-cart-order-quantity"]}>
                                    <label>{t("Quantity")}:</label>
                                    <CFormInput type='text' value={cart.quantity} name='quantity' onChange={handleChangeCart} style={{width:"50px"}}/>
                            </div>
                            :
                            ""
                        }
                        <div className={styles["add-to-cart-total-price"]}>
                            <p>{t("Total Price")}:</p>
                            <h3>{cart.totalPrice.toFixed(2)} TND</h3>
                        </div>
                        <div className={styles["add-to-cart-button"]}>
                            <CButton type='submit' style={{width:"100%",margin:"20px 0"}}>
                                {t("Add To Cart")}
                            </CButton>
                        </div>
                    </CForm>
            </div>
            <div className={styles["single-product-reviews"]}>
                {userData?
                    <CForm className={styles["single-product-add-review"]} onSubmit={handleAddReview}>
                        <div className={styles["add-review-info"]}>
                                <img src={userData?.avatar} alt="" />
                                <p>{userData?.name}</p>
                        </div>
                        <div className={styles["add-review-stars"]}>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />
                        </div>
                        <div className={styles["add-review-text"]}>
                            <CFormTextarea
                                id="reviewText"
                                label={t("Add review text:")}
                                onChange={handleChangeReviewText}
                                rows={3}
                                name="content"
                                value={review.text}
                            ></CFormTextarea>
                        </div>
                        <div className={styles["add-review-button"]}>
                            <CButton type='submit' style={{width:"100%",margin:"20px 0"}}>
                                {t("Add Review")}
                            </CButton>
                        </div>
                    </CForm>
                    :
                    ""
                }
                <div className={styles["reviews-list"]}>
                    {reviews?.map((review,indexRev)=>(
                    <div key={indexRev} className={styles["single-review"]}>
                        <div className={styles["single-product-add-review"]}>
                            <div className={styles["add-review-info"]}>
                                    <img src={review.userId.avatar} alt="" />
                                    <p>
                                        <span>{review.userId.name}</span>
                                        <span>{review.userId.nbrReviews} {t("reviews")}</span>
                                    </p>
                            </div>
                            {review.userId._id==userData?._id?
                            <div className={styles["remove-review"]}>
                                <BsXSquareFill onClick={handleRemoveReview} id={review._id} className={styles["remove-review-icon"]}/>
                            </div>
                                :
                                ""
                            }
                            
                            <p className={styles["review-date"]}>
                                {moment(review.createdAt).format("YYYY-MM-DD")}
                            </p>
                            <div className={styles["add-review-stars"]}>
                            <ReactStars
                                count={5}
                                size={24}
                                value={review.stars}
                                edit={false}
                                activeColor="#ffd700"
                                fullIcon={<BsFillStarFill />}
                            />
                            </div>
                            <div className={styles["add-review-text"]}>
                                <p>
                                    {review.text}
                                </p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
        : <Error404/>
        }
        </>
        :
        <div className="spinner">
            <Spinner animation="border" />
        </div> 
        }
        </>
    )
}
export default SingleProduct