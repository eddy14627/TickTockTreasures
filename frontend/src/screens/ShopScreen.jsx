import React, { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { Button, Offcanvas } from "react-bootstrap";
import RangeSliderWithTwoPointers from "../components/widgets/RangeSlider";
import GenderBox from "../components/widgets/GenderBox";
import WatchType from "../components/widgets/WatchType";
import BrandListBox from "../components/widgets/BrandListBox";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/widgets/Message";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { useFiltersAppiliedQuery } from "../slices/filterApiSlice";
import { useSelector } from "react-redux";

const ShopScreen = () => {
  const { pageNumber = 1, keyword = "" } = useParams();
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const navigate = useNavigate();

  const filters = useSelector((state) => state.appliedFilters);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const response = useFiltersAppiliedQuery({
    filters,
    pageNumber,
  });
  console.log(response);

  useEffect(() => {
    if (isFilterApplied) {
      setData(response.data);
      setIsLoading(false);
      setError(response.error);
      setIsFilterApplied(false);
    }
  }, [isFilterApplied]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handelApplyFilter = () => {
    setIsOpen(!isOpen);
    setIsFilterApplied(true);
  };

  const handlePageChange = (page) => {
    navigate(`/shop/page/${page}`);
  };

  return (
    <>
      {!isOpen && (
        <Button onClick={toggleDrawer}>
          <BsFilterLeft /> Filters
        </Button>
      )}
      <Offcanvas show={isOpen} onHide={toggleDrawer} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <BsFilterLeft /> Filters
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <Row style={{ marginTop: "0px" }}>
            <strong style={{ marginBottom: "15px" }}>Price</strong>
            <RangeSliderWithTwoPointers />
          </Row>
          <Row style={{ marginTop: "25px" }}>
            <strong>Gender Type</strong>
            <GenderBox />
          </Row>
          <Row style={{ marginTop: "25px" }}>
            <strong>Watch Type</strong>
            <WatchType />
          </Row>
          <Row style={{ marginTop: "25px" }}>
            <strong>Brands</strong>
            <BrandListBox />
          </Row>
          <Button onClick={handelApplyFilter}>apply</Button>
        </Offcanvas.Body>
      </Offcanvas>
      <>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Meta />
            <Row>
              {/* Adjust the rendering based on the actual structure of the data */}
              {data &&
                data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
            <Paginate
              pages={data && data.pages}
              page={data && data.page}
              keyword={keyword}
              onPageChange={handlePageChange}
              isShop={true}
            />
          </>
        )}
      </>
    </>
  );
};

export default ShopScreen;
