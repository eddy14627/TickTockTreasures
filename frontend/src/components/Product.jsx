import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded shadow">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.profileImage}
          variant="top"
          className="product-image"
          style={{ height: "200px", width: "100%", objectFit: "cover" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as="div" className="product-rating">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h4" className="product-price">
          &#8377; {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
