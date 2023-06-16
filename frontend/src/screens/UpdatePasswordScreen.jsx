import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useLocation } from "react-router-dom";

import { useChangePasswordMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const PasswordChangeScreen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pastEmail = queryParams.get("email");
  console.log(pastEmail);
  const [email, setEmail] = useState(pastEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const navigate = useNavigate();

  // TODO: HOW MANY PARAMETER ARE THERE IN useSendOtpMutation OR ANY OTHER MUTATION
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        // TODO: WHY THIS UNWRAP IS USED
        const res = await changePassword({ email, password }).unwrap();
        navigate("/login");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Verify Otp</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder={email ? email : "Enter email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Otp</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="againPassword">
          <Form.Label>confirm Password</Form.Label>
          <Form.Control
            type="againPassword"
            placeholder="re-enter Password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row className="py-3 ">
          <Col>
            <Button
              disabled={isLoading}
              type="submit"
              variant="primary"
              block
              className="col-12"
            >
              Update Password
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default PasswordChangeScreen;
