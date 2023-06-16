import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // TODO: HOW MANY PARAMETER ARE THERE IN useSendOtpMutation OR ANY OTHER MUTATION
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // TODO: WHY THIS UNWRAP IS USED
      const res = await sendOtp({ email }).unwrap();
      setShow(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const OtpHandler = async (e) => {
    e.preventDefault();
    try {
      // TODO: WHY THIS UNWRAP IS USED
      const res = await verifyOtp({ email, otp }).unwrap();
      //   setShow(true);
      navigate(`/updatePassword?email=${encodeURIComponent(email)}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Password Change</h1>
      {!show ? (
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                Send Otp
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <>
          <Form onSubmit={OtpHandler}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="otp">
              <Form.Label>Otp</Form.Label>
              <Form.Control
                type="otp"
                placeholder="Enter otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className="py-3 ">
              <Col>
                <Button
                  disabled={isVerifyingOtp}
                  type="submit"
                  variant="primary"
                  block
                  className="col-12"
                >
                  Verify
                </Button>
              </Col>
            </Row>
          </Form>
          <Row className="py-3">
            <p style={{ cursor: "pointer" }} onClick={() => setShow(false)}>
              Resend Otp?
            </p>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default LoginScreen;
