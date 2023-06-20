import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./widgets/Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "50vh" }}
            >
              <Image
                src={product.profileImage}
                alt={product.name}
                fluid
                style={{
                  objectFit: "contain",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </div>
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
