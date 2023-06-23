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
import {
  useFiltersAppiliedMutation,
  useGetAvailableBrandNameQuery,
} from "../slices/filterApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/widgets/RatingBox";
import { resetFilters, setfilters } from "../slices/filterSlice";

const ShopScreen = () => {
  let { pageNumber = 1, keyword = "" } = useParams();
  console.log(keyword);
  // const [appliedKeyword, setAppliedKeyword] = useState(keyword);
  const [data, setData] = useState(null);
  const [brandOptions, setBrandOptions] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: brandData } = useGetAvailableBrandNameQuery();

  useEffect(() => {
    const options = [];
    if (brandData) {
      for (let i = 0; i < brandData.brandNameList.length; i++) {
        options.push({ id: i, label: brandData.brandNameList[i] });
      }
    }
    console.log(options);
    setBrandOptions(options);
  }, [brandData]);

  const filters = useSelector((state) => state.appliedFilters);

  // eslint-disable-next-line
  const [filtersAppilied, { isLoading: loadingUpdate }] =
    useFiltersAppiliedMutation();

  const fetchData = async () => {
    const response = await filtersAppilied({
      filters: filters,
      keyword: keyword,
      pageNumber: pageNumber,
    });
    setData(response.data);
    setError(response.error);
  };

  useEffect(() => {
    // setAppliedKeyword(keyword);
    // if (isFilterApplied)
    // if (appliedKeyword === keyword) {
    fetchData();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isFilterApplied]);
  }, [keyword, pageNumber]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handelApplyFilter = () => {
    setIsOpen(!isOpen);
    navigate(`/shop`);
    // keyword = "";
    // setAppliedKeyword("");
    // setIsFilterApplied(true);
    fetchData();
  };
  const handelApplyReset = () => {
    setIsOpen(!isOpen);
    navigate(`/shop`);
    // setAppliedKeyword("");
    // keyword = "";
    // setIsFilterApplied(true);
    dispatch(resetFilters());
    fetchData();
  };

  const handlePageChange = (page) => {
    // setIsFilterApplied(true);
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
            <strong>Rating</strong>
            <Rating />
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
            <BrandListBox options={brandOptions} />
          </Row>

          <Row style={{ marginTop: "25px" }}>
            <Button onClick={handelApplyFilter}>apply</Button>
          </Row>
          <Row style={{ marginTop: "25px" }}>
            <Button onClick={handelApplyReset}>Reset</Button>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
      <>
        {loadingUpdate ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Meta />
            {data && data.count > 0 ? (
              <Row>
                {/* Adjust the rendering based on the actual structure of the data */}

                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Message variant="info">No products found</Message>
            )}
            {/* {console.log(data)} */}
            <Paginate
              pages={data && data.pages}
              page={data && data.page}
              keyword={keyword}
              // onClick={handlePageChange}
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
