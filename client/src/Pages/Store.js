import React from "react";
import StoreCategories from "../components/Store/StoreCategories";
import StoreProducts from "../components/Store/StoreProducts";
import StoreSlider from "../components/Store/StoreSlider";

const Store = () => {
  return (
    <>
      <StoreSlider />
      <StoreCategories />
      <StoreProducts/>
    </>
  );
};

export default Store;