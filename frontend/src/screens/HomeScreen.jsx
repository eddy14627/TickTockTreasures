import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/widgets/Message";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import "../utils/extra_css.css";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [latest, setLatest] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [smartWatches, setSmartWatches] = useState([]);
  const [luxuryWatches, setLuxuryWatches] = useState([]);
  const [casualWatches, setCasualWatches] = useState([]);
  const [sportsWatches, setSportsWatches] = useState([]);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    if (data && data.products) {
      const productByLatest = data.products.slice(0, 8);
      const productByBestSeller = data.products
        .filter((product) => {
          return product.rating >= 4;
        })
        .slice(0, 8);
      const productBySmartWatches = data.products
        .filter((product) => {
          return product.watchType === "smart";
        })
        .slice(0, 8);
      const productByLuxuryWatches = data.products
        .filter((product) => {
          return product.watchType === "lux";
        })
        .slice(0, 8);
      const productByCasualWatches = data.products
        .filter((product) => {
          return product.watchType === "casual";
        })
        .slice(0, 8);
      const productBySportsWatches = data.products
        .filter((product) => {
          return product.watchType === "sports";
        })
        .slice(0, 8);
      setLatest(productByLatest);
      setBestSeller(productByBestSeller);
      setSmartWatches(productBySmartWatches);
      setLuxuryWatches(productByLuxuryWatches);
      setCasualWatches(productByCasualWatches);
      setSportsWatches(productBySportsWatches);
    }
    // eslint-disable-next-line
  }, [data && data.products]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row className="mb-4">
            <div className="horizontal-slider">
              <div className="slider-container">
                <div className="slider-wrapper">
                  {latest.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </div>
              </div>
            </div>
          </Row>
          <h1>Best Seller</h1>
          <Row className="mb-4">
            <div className="horizontal-slider">
              <div className="slider-container">
                <div className="slider-wrapper">
                  {bestSeller.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </div>
              </div>
            </div>
          </Row>
          <h1>Smart Watches</h1>
          <Row className="mb-4">
            <div className="horizontal-slider">
              <div className="slider-container">
                <div className="slider-wrapper">
                  {smartWatches.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </div>
              </div>
            </div>
          </Row>
          <h1>luxury Watches</h1>
          <Row className="mb-4">
            <div className="horizontal-slider">
              <div className="slider-container">
                <div className="slider-wrapper">
                  {luxuryWatches.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </div>
              </div>
            </div>
          </Row>
          <h1>Casual Watches</h1>
          <Row className="mb-4">
            <div className="horizontal-slider">
              <div className="slider-container">
                <div className="slider-wrapper">
                  {casualWatches.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </div>
              </div>
            </div>
          </Row>
          <h1>Sports Watches</h1>
          <Row className="mb-4">
            <div className="horizontal-slider">
              <div className="slider-container">
                <div className="slider-wrapper">
                  {sportsWatches.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </div>
              </div>
            </div>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
