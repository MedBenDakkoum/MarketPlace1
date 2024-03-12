import React,{useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {getProductFullInfo} from '../../services/productData'
import { Spinner } from 'react-bootstrap';
import { CForm,CButton, CFormInput,CFormSelect} from '@coreui/react';
import ImagesViewer from "./ImagesViewer";
import {addToCart} from '../../services/userData'
import Alert from '../Alert/Alert';

function SingleProduct() {
    const params = useParams();
    const navigate= useNavigate();
    const [loading, setLoading] = useState(true);
    const [alert, setAlert]= useState({
        msg:"",
        type:"",
        refresh:true
    })
    const [data,setData] = useState({});
    const [attributes,setAttributes] = useState(
        {
        Size:["S","M","L","XL","XXL"],
        Color:["White","Black","Blue","Red"]
    }
    );
    const [selectedAttributes,setSelectedAttributes] = useState({});
    const [cart,setCart] = useState({
        quantity:1,
        totalPrice:0,
    });
    useEffect(function(){
        async function init(){
            setLoading(true);
            await getProductFullInfo(params.id)
            .then(function(prodData){
                setData({...prodData}); 
                setCart({...cart,totalPrice:prodData.product.newPrice})
                setLoading(false)
                //setAttribute({...data.initialProducts.attributes})
                let sA = {}
                Object.keys(attributes).map((attr)=>{
                    sA[attr]=attributes[attr][0];
                });
                setSelectedAttributes({...sA})
            });
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
            setAlert({msg:"Added to Cart!",type:"success",refresh:!alert.refresh})
            setLoading(false);
        }).catch(function(err){
            setAlert({msg:"Error while adding to cart!",type:"fail",refresh:!alert.refresh})
            setLoading(false);
        });
    }
    const handleChangeAttributes = (e)=>{
        setSelectedAttributes({...selectedAttributes,[e.target.name]:e.target.value})
    }
    return (<>
        {!loading? 
        <div className="single-product-container">
            <Alert msg={alert.msg} type={alert.type} refresh={alert.refresh}/>
            <ImagesViewer imgs={data?.product?.images}/> 
            <div className="single-product-info">
                <div className="single-product-info-container">
                    <div className="product-tags">
                        <p>{data?.initialProduct?.category}</p>
                    </div>
                    <div className="product-name">
                        <h2>{data?.initialProduct?.name}</h2>
                    </div>
                    <div className="store-name">
                        <p>Store: <span onClick={function(e){navigate("/s/"+data?.store?.link)}} style={{cursor:"pointer"}}>{data?.store?.title}</span></p>
                    </div>
                    <div className="product-price">
                        <p>{data?.product?.newPrice} TND</p>
                    </div>
                    <div className="product-attributes">
                        <h3>Product Attributes:</h3>
                        {Object.keys(attributes)?.map((e)=>(
                            <div className="single-product-attribute">
                                <h4>
                                    {e}:
                                </h4>
                                <CFormSelect name={e} value={selectedAttributes[e]} onChange={handleChangeAttributes}>
                                    {attributes[e]?.map((a)=>(
                                        <option value={a}>{a}</option>
                                    ))}
                                </CFormSelect>
                            </div>
                        ))}
                    </div>
                    <div className="product-info">
                        <h3>Product Info:</h3>
                        <h5>Description:</h5>
                        <p className='product-desc'>{data?.initialProduct?.description}</p>
                    </div>
                </div>
                <CForm className="single-product-add-to-cart" onSubmit={handleAddToCart}>
                    <div className="add-to-cart-product-price">
                            <p>{data?.product?.newPrice} TND</p>
                    </div>
                    <div className="add-to-cart-product-attributes">
                        {Object.keys(selectedAttributes)?.map((e)=>{
                            return(
                                <h4>
                                    {e}: {selectedAttributes[e]}
                                </h4>
                        )})}
                    </div>
                    <div className="add-to-cart-product-stock">
                        {data?.initialProduct?.quantity>0?
                            <p style={{color:"rgb(0, 184, 0)"}}>In Stock</p>
                        :
                            <p style={{color:"red"}}>Out Of Stock</p>
                            }
                    </div>
                    {data?.initialProduct?.quantity>0?
                        <div className="add-to-cart-order-quantity">
                                <label>Quantity:</label>
                                <CFormInput type='text' value={cart.quantity} name='quantity' onChange={handleChangeCart} style={{width:"50px"}}/>
                        </div>
                        :
                        ""
                    }
                    <div className="add-to-cart-total-price">
                        <p>Total Price:</p>
                        <h3>{cart.totalPrice} TND</h3>
                    </div>
                    <div className="add-to-cart-button">
                        <CButton type='submit' style={{width:"100%",margin:"20px 0"}}>
                            Add To Cart
                        </CButton>
                    </div>
                </CForm>
            </div>
        </div>
        :
        <div className="spinner">
            <Spinner animation="border" />
        </div> 
        }
        </>
    )
}
export default SingleProduct