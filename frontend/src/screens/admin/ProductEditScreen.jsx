import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/widgets/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageOnCloudinaryMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const [isWearable, setIsWearable] = useState("");
  const [watchType, setWatchType] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadOnCloudinary, { isLoading: cloudinaryUploadLoading }] =
    useUploadProductImageOnCloudinaryMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        profileImage,
        images,
        brand,
        gender,
        isWearable,
        watchType,
        description,
        countInStock,
      });

      toast.success("Product updated");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImages(product.images);
      setProfileImage(product.profileImage);
      setBrand(product.brand);
      setGender(product.gender);
      setIsWearable(product.isWearable);
      setWatchType(product.watchType);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadImagesHandler = async (e) => {
    const formData = new FormData();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    try {
      const res = await uploadOnCloudinary(formData).unwrap();
      toast.success(res.message);
      console.log(res);
      setImages(res.images);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadProfileImagesHandler = async (e) => {
    const formData = new FormData();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await uploadOnCloudinary(formData).unwrap();
      toast.success(res.message);
      console.log(res);
      setProfileImage(res.images[0]);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Images</Form.Label>
              <Form.Control
                label="Choose Files"
                onChange={uploadImagesHandler}
                type="file"
                accept="image/*"
                multiple
              />

              {cloudinaryUploadLoading && <Loader />}
            </Form.Group>
            <Form.Group controlId="profileImage">
              <Form.Label>Profile Images</Form.Label>
              <Form.Control
                label="Choose Files"
                onChange={uploadProfileImagesHandler}
                type="file"
                accept="image/*"
                multiple
              />
              {cloudinaryUploadLoading && <Loader />}
            </Form.Group>

            {/* Gender Dropdown */}
            <Form.Group controlId="gender">
              <Form.Label>Gender Type</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </Form.Select>
            </Form.Group>

            {/* isWearable Dropdown */}
            <Form.Group controlId="isWearable">
              <Form.Label>Is Wearable</Form.Label>
              <Form.Select
                value={isWearable}
                onChange={(e) => setIsWearable(e.target.value)}
              >
                <option value="">Select Wearable Status</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Select>
            </Form.Group>

            {/* Watch Type Dropdown */}
            <Form.Group controlId="watchType">
              <Form.Label>Watch Type</Form.Label>
              <Form.Select
                value={watchType}
                onChange={(e) => setWatchType(e.target.value)}
              >
                <option value="">Select Watch Type</option>
                <option value="lux">Lux</option>
                <option value="sports">Sports</option>
                <option value="smart">Smart</option>
                <option value="casual">Casual</option>
              </Form.Select>
            </Form.Group>

            {/* Other Fields */}
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
