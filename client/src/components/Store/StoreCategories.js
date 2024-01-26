import styled from "styled-components";
import { categories } from "./data";
import { mobile } from "./responsive";
import StoreCategoryItem from "./StoreCategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const StoreCategories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <StoreCategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default StoreCategories;