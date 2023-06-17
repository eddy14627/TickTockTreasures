import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/widgets/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import "../utils/extra_css.css";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

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
                  {data.products.map((product) => (
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
                  {data.products.map((product) => (
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
                  {data.products.map((product) => (
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
                  {data.products.map((product) => (
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
                  {data.products.map((product) => (
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
