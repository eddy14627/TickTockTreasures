import React from "react";
import { ListGroup } from "react-bootstrap";

const ProductDetails = ({ name, rating, numReviews, price, description }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h3>{name}</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        Rating: {rating} ({numReviews} reviews)
      </ListGroup.Item>
      <ListGroup.Item>Price: ₹{price}</ListGroup.Item>
      <ListGroup.Item>Description: {description}</ListGroup.Item>
    </ListGroup>
  );
};

export default ProductDetails;
