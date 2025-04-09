import React from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import Rating from "./Rating";
import Loader from "./Loader";
import Message from "./widgets/Message";

const ReviewsSection = ({
  reviews,
  userInfo,
  loadingProductReview,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
}) => {
  return (
    <div className="reviews-section">
      <h2>Customer Reviews</h2>

      {/* Display Existing Reviews */}
      {reviews.length === 0 ? (
        <Message>No Reviews Yet</Message>
      ) : (
        <ListGroup variant="flush">
          {reviews.map((review) => (
            <ListGroup.Item key={review._id} className="mb-3">
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p className="text-muted">{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Submit a Review */}
      <div className="submit-review mt-4">
        <h2>Write a Review</h2>

        {loadingProductReview && <Loader />}

        {userInfo ? (
          <Form onSubmit={submitHandler}>
            {/* Rating Input */}
            <Form.Group className="my-3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </Form.Control>
            </Form.Group>

            {/* Comment Input */}
            <Form.Group className="my-3" controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={loadingProductReview}
            >
              Submit Review
            </Button>
          </Form>
        ) : (
          <Message variant="info">
            Please <a href="/login">sign in</a> to write a review.
          </Message>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
