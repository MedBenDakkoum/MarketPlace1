import { useEffect, useState } from "react";
import CustomSlider from "../components/Home/customer.slider";
import CategoriePriceFromSection from "../components/Home/CategoriePriceFromSection";
import './Home.css';

const homeProds=[
  {
    "title":"Soft Chairs",
    "priceFrom":20.0,
    "img":"https://ettajer.com.tn/4/image4.jpg",
  },
  {
    "title":"Sofa & chair",
    "priceFrom":20.0,
    "img":"https://ettajer.com.tn/1/image1.jpg",
  },
  {
    "title":"Kitchen dishes",
    "priceFrom":20.0,
    "img":"https://ettajer.com.tn/2/image2.jpg",
  },
  {
    "title":"Smart watches",
    "priceFrom":20.0,
    "img":"https://ettajer.com.tn/3/image3.jpg",
  },
  {
    "title":"Kitchen mixer",
    "priceFrom":20.0,
    "img":"https://ettajer.com.tn/5/image5.jpg",
  },
  {
    "title":"Blenders",
    "priceFrom":20.0,
    "img":"https://ettajer.com.tn/6/image6.jpg",
  },
  {
    "title":"Home appliance",
    "priceFrom":20.0,
    "img":"https://ettajer.com.tn/7/image7.jpg",
  },
  {
    "title":"Coffee maker",
    "priceFrom":20.0,
    "img":"https://ettajer.com.tn/8/image8.jpg",
  }
]
const recommendedItems = [
  {
    img:"https://ettajer.com.tn/1/image1.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
  {
    img:"https://ettajer.com.tn/2/image2.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
  {
    img:"https://ettajer.com.tn/3/image3.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
  {
    img:"https://ettajer.com.tn/4/image4.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
  {
    img:"https://ettajer.com.tn/5/image5.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
  {
    img:"https://ettajer.com.tn/6/image6.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
  {
    img:"https://ettajer.com.tn/7/image7.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
  {
    img:"https://ettajer.com.tn/8/image8.jpg",
    price:20.0,
    name:"Black T shirt for men zkejfzej Lorem; dsnfkjsdnfjksdnfkjk dfjksfn"
  },
  {
    img:"https://ettajer.com.tn/20/image20.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
  {
    img:"https://ettajer.com.tn/21/image21.jpg",
    price:20.0,
    name:"Black T shirt for men"
  },
]
function Home({ match }) {
  const images = [
    {
      imgURL:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      imgAlt: "img-1"
    },
    {
      imgURL:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      imgAlt: "img-2"
    },
    {
      imgURL:
        "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      imgAlt: "img-3"
    },
    {
      imgURL:
        "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      imgAlt: "img-4"
    }
  ];
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("oldest");

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <>
      <CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomSlider>
      <CategoriePriceFromSection title="Home and outdoor" prods={homeProds}/>
      <CategoriePriceFromSection title="Consumer electronics" prods={homeProds}/>
      <h1 className="home-section-title" style={{color:"#1c1c1c"}}>
        Recommended items
      </h1>
      <section className="home-recommended-items-container">
        <div className="home-recommended-items">
          {recommendedItems.map((item)=>(
            <div className="hri-item">
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
