import React, { useState ,useEffect} from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';

const Products = ({ productData }) => {
  const dispatch = useDispatch();
  //<------15TH BUG --------->
  // USING useNavigate hook
  const navigate = useNavigate();

  const itemsPerPage = 5;
  // <----------FIXED THE 41TH BUG ----------->
  // using useeffect to rerender the products page logic when the page is changed

  const { currentRole} = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  
// <--------FIXED THE 40TH BUG ------>
// FIXED THE LOGIC TO CALCULATE PAGING AND SLICING PRODUCTS
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(productData.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, productData]);


  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleUpload = (event, product) => {
    event.stopPropagation();
    console.log(product);
    dispatch(addStuff("ProductCreate", product));
  };

  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first");
    setShowPopup(true)
  };

  

  
      {/* <------16TH BUG FIXED --------------> */}
      {/* REPLACE  responseSearch from productData */}
  if (!productData || productData.length === 0) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductGrid container spacing={3}>
        {currentItems.map((data, index) => (
          <Grid item xs={12} sm={6} md={4}
            key={index}
            onClick={() => navigate("/product/view/" + data._id)}
            sx={{ cursor: "pointer" }}
          >
            <ProductContainer>
              <ProductImage src={data.productImage} />
              <ProductName>{data.productName}</ProductName>
              <PriceMrp>{data.price.mrp}</PriceMrp>
              <PriceCost>₹{data.price.cost}</PriceCost>
              <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
              <AddToCart>
                {currentRole === "Customer" &&
                  <>
                    <BasicButton
                      onClick={(event) => handleAddToCart(event, data)}
                    >
                      Add To Cart
                    </BasicButton>
                  </>
                }
                {currentRole === "Shopcart" &&
                  <>
                    <BasicButton
                      onClick={(event) => handleUpload(event, data)}
                    >
                      Upload
                    </BasicButton>
                  </>
                }

              </AddToCart>
            </ProductContainer>
          </Grid>
        ))}
      </ProductGrid>

      <Container sx={{ mt: 10, mb: 10, display: "flex", justifyContent: 'center', alignItems: "center" }}>


        <Pagination
          count={Math.ceil(productData.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="secondary"

        />
      </Container>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
};

export default Products;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
`;

const PriceMrp = styled.p`
  margin-top: 8px;
  text-align: center;
  text-decoration: line-through;
  color: #525050;
`;

const PriceCost = styled.h3`
  margin-top: 8px;
  text-align: center;
`;

const PriceDiscount = styled.p`
  margin-top: 8px;
  text-align: center;
  color: darkgreen;
`;

const AddToCart = styled.div`
  margin-top: 16px;
`;
