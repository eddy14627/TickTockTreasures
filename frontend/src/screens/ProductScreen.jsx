import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../utils/extra_css.css";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/widgets/Message";
import Meta from "../components/Meta";
import { addToCart } from "../slices/cartSlice";
import Product from "../components/Product";
import { useFiltersAppiliedMutation } from "../slices/filterApiSlice";
import { useAddToCartApiMutation } from "../slices/cartApiSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [addToCartApi] = useAddToCartApiMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // this products is used for getting related products
  const [products, setProducts] = useState([]);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productAdded, setProductsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log(product);

  const handleAddToCart = async () => {
    const response = await addToCartApi({
      quantity: qty,
      productId: productId,
    }).unwrap();

    if (response) {
      // dispatch(setCart(response.cartItems)); // Update local state
      dispatch(addToCart({ ...product, qty })); // this will have info about how many product is added of this type
      setProductsAdded(true);
    }
  };

  const addToCartHandler = () => {
    // add to cart if user is logged in
    if (userInfo) {
      handleAddToCart();
    } else {
      navigate(`/login?redirect=${location.pathname}`);
    }
  };

  // used for related product
  const [filtersAppilied] = useFiltersAppiliedMutation();

  const fetchData = async () => {
    if (product) {
      // const initialImageIndex = product.image.findIndex(
      //   (img) => img === product.profileImage
      // );
      // setCurrentImageIndex(initialImageIndex);
      const response = await filtersAppilied({
        filters: [
          { brand: [product.brand] },
          { watchType: [product.watchType] },
        ],
      });
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [product]);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    window.scrollTo(0, 0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  // description
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateDescription = (description, words) => {
    const wordArray = description.split(" ");
    const sendingDescription = wordArray.slice(0, words);
    return sendingDescription.join(" ");
  };

  const descriptionToShow = (description) => {
    return truncateDescription(description, 40);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
    window.scroll(0, 0);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col
              md={6}
              className="position-relative d-flex justify-content-center"
            >
              <div>
                {product.image.length > 1 && (
                  <div className="arrow-buttons d-flex mx-auto my-5">
                    <button
                      className="arrow-button left-arrow mx-auto border-0"
                      onClick={previousImage}
                      style={{ background: "none", height: "auto" }}
                    >
                      <AiOutlineLeft />
                    </button>
                    <div className="product-image-container">
                      <Image
                        src={product.image[currentImageIndex]}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                    <button
                      className="arrow-button right-arrow mx-auto border-0"
                      onClick={nextImage}
                      style={{ background: "none", height: "auto" }}
                    >
                      <AiOutlineRight />
                    </button>
                  </div>
                )}
              </div>
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    <strong>Description: </strong>
                    {showFullDescription
                      ? product.description
                      : descriptionToShow(product.description)}

                    <Button variant="link" onClick={toggleDescription}>
                      {showFullDescription ? "Show Less" : "...Show More"}
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0 || productAdded}
                      onClick={addToCartHandler}
                    >
                      {productAdded ? "Already Added to Cart" : "Add To Cart"}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="my-2" controlId="rating">
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
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          {products && (
            <div className="horizontal-slider">
              <h2>Related Products</h2>
              <div className="slider-container">
                <div className="slider-wrapper" style={{ margin: "0 -10px" }}>
                  {products.map((product) => (
                    <Col
                      key={product._id}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={3}
                      style={{ padding: "0 10px" }}
                    >
                      <Product product={product} />
                    </Col>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
