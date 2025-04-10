import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 rounded shadow product-card"
      style={{ border: "none" }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.profileImage}
          variant="top"
          className="product-image"
          style={{
            height: "250px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px 10px 0 0",
          }}
        />
      </Link>

      <Card.Body style={{ textAlign: "center", padding: "1rem" }}>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <Card.Title
            as="div"
            className="product-title"
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as="div" className="product-rating">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text
          as="h4"
          className="product-price"
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginTop: "0.5rem",
          }}
        >
          ₹{product.price}{" "}
          <span
            style={{
              textDecoration: "line-through",
              fontSize: "0.9rem",
              color: "#888",
            }}
          >
            {product.originalPrice}
          </span>
        </Card.Text>

        {product.discount && (
          <div
            className="discount-badge"
            style={{
              position: "absolute",
              top: "-10px",
              left: "-10px",
              backgroundColor: "#003580",
              color: "#fff",
              padding: "0.3rem 0.6rem",
              borderRadius: "5px",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            {`${product.discount}% OFF`}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
