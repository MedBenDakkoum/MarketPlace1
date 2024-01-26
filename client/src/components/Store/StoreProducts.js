import styled from "styled-components";
import { popularProducts } from "./data";
import StoreProduct from "./StoreProduct";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const StoreProducts = () => {
  return (
    <Container>
      {popularProducts.map((item) => (
        <StoreProduct item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default StoreProducts;