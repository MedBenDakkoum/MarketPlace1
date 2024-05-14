import { useEffect, useState } from "react";
import CustomSlider from "../components/Home/customer.slider";
import CategoriePriceFromSection from "../components/Home/CategoriePriceFromSection";
import './Home.css';
import {getAllLayouts} from "../services/publicData"
import { useNavigate } from 'react-router-dom';

function Home({ match }) {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topBannerImages,setTopBannerImages] = useState([])
  const [sections, setSections] = useState([]);
  const [recommendedItems,setRecommendedItems] = useState([]);
  const navigate = useNavigate();
  const getLayoutByRef = (ref,layouts)=>{
    let aa = [...layouts]
    return aa.filter(layout => layout.sectionRef==ref)
  }
  useEffect(function(){
    async function init(){
      await getAllLayouts().then((layouts)=>{
        setTopBannerImages(getLayoutByRef("top_banner_images",layouts)[0].data)
        setSections(getLayoutByRef("single_cat_prods",layouts)[0].data);
        setRecommendedItems(getLayoutByRef("recommended_items",layouts)[0].data);
      })
    }
    init()
  },[])
  return (
    <>
      <CustomSlider>
        {topBannerImages?.map((image, index) => {
          return <img onClick={()=>{navigate(image.link)}} key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomSlider>
      {sections?.map((section)=>(
        <CategoriePriceFromSection title={section.title} prods={section.prods}/>
      ))}
      <h1 className="home-section-title" style={{color:"#1c1c1c"}}>
        Recommended items
      </h1>
      <section className="home-recommended-items-container">
        <div className="home-recommended-items">
          {recommendedItems.map((item)=>(
            <div className="hri-item" onClick={(e)=>{navigate(item.link)}}>
              <img src={item.img} />
              <div className="hri-item-info">
                <p>{item.price} TND</p>
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
