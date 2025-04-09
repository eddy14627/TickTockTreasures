import React from "react";
import { Card, ListGroup, Row, Col, Form, Button } from "react-bootstrap";

const AddToCartSection = ({
  price,
  countInStock,
  qty,
  setQty,
  addToCartHandler,
  productAdded,
}) => {
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>Price: ₹{price}</ListGroup.Item>
        <ListGroup.Item>
          Status: {countInStock > 0 ? "In Stock" : "Out Of Stock"}
        </ListGroup.Item>

        {countInStock > 0 && (
          <>
            <ListGroup.Item>
              Qty:
              <Form.Control
                as="select"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
            </ListGroup.Item>

            <Button
              className="btn-block"
              type="button"
              disabled={!countInStock || productAdded}
              onClick={addToCartHandler}
            >
              {productAdded ? "Already Added to Cart" : "Add To Cart"}
            </Button>
          </>
        )}
      </ListGroup>
    </Card>
  );
};

export default AddToCartSection;
