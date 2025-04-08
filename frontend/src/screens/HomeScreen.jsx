import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/widgets/Message";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import OfferComponent from "../components/OfferBanner"; // Import OfferComponent

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [latest, setLatest] = useState([]);
  const [luxuryWatches, setLuxuryWatches] = useState([]);
  const [smartWatches, setSmartWatches] = useState([]);
  const [casualWatches, setCasualWatches] = useState([]);
  const [sportsWatches, setSportsWatches] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  // Scroll Ref
  const scrollRef = useRef({});

  // Scroll Functions
  const scrollLeft = (category) => {
    scrollRef.current[category].scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (category) => {
    scrollRef.current[category].scrollBy({ left: 300, behavior: "smooth" });
  };

  // Populate product categories
  useEffect(() => {
    if (data && data.products) {
      setLatest(data.products.slice(0, 8));
      setLuxuryWatches(
        data.products.filter((p) => p.watchType === "lux").slice(0, 8)
      );
      setSmartWatches(
        data.products.filter((p) => p.watchType === "smart").slice(0, 8)
      );
      setCasualWatches(
        data.products.filter((p) => p.watchType === "casual").slice(0, 8)
      );
      setSportsWatches(
        data.products.filter((p) => p.watchType === "sports").slice(0, 8)
      );
      setBestSeller(data.products.filter((p) => p.rating >= 4).slice(0, 8));
    }
  }, [data]);

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
          {/* Offer Section */}
          <OfferComponent />

          {/* Render Product Rows */}
          <ProductRow
            title="Latest Arrivals"
            products={latest}
            category="latest"
            scrollRef={scrollRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />
          <ProductRow
            title="Luxury Collection"
            products={luxuryWatches}
            category="luxury"
            scrollRef={scrollRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />
          <ProductRow
            title="Smart Watches"
            products={smartWatches}
            category="smart"
            scrollRef={scrollRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />
          <ProductRow
            title="Casual Styles"
            products={casualWatches}
            category="casual"
            scrollRef={scrollRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />
          <ProductRow
            title="Sports Editions"
            products={sportsWatches}
            category="sports"
            scrollRef={scrollRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />
          <ProductRow
            title="Best Sellers"
            products={bestSeller}
            category="bestseller"
            scrollRef={scrollRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />
        </>
      )}
    </>
  );
};

const ProductRow = ({
  title,
  products,
  category,
  scrollRef,
  scrollLeft,
  scrollRight,
}) => {
  return (
    <div className="product-row">
      <h2>{title}</h2>
      <div className="slider-container">
        {/* Left Arrow */}
        <button className="arrow-btn left" onClick={() => scrollLeft(category)}>
          &#8249;
        </button>
        {/* Product List */}
        <div
          className="slider-wrapper"
          ref={(el) => (scrollRef.current[category] = el)}
        >
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          className="arrow-btn right"
          onClick={() => scrollRight(category)}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
