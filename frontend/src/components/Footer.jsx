import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer text-white py-5"
      style={{ background: "linear-gradient(135deg, #1c1c1c, #343a40)" }}
    >
      <Container>
        <Row className="text-center text-md-start">
          {/* Brand & Tagline */}
          <Col md={3} className="mb-4">
            <h4 className="fw-bold">⏳ TickTockTreasure</h4>
            <p>Your one-stop shop for luxury and classic watches.</p>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/shop" className="text-white text-decoration-none">
                  🛒 Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  📖 About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  📞 Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-white text-decoration-none">
                  ❓ FAQs
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Information */}
          <Col md={3} className="mb-4">
            <h5 className="fw-bold">Get in Touch</h5>
            <p>
              <FaMapMarkerAlt /> 123 Watch Street, Time City
            </p>
            <p>
              <FaPhone /> +1 (123) 456-7890
            </p>
            <p>
              <FaEnvelope /> support@ticktocktreasure.com
            </p>
          </Col>

          {/* Newsletter Subscription */}
          <Col md={3} className="mb-4">
            <h5 className="fw-bold">Subscribe for Updates</h5>
            <p>Stay updated on new arrivals and exclusive offers.</p>
            <Form>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-pill"
                />
              </Form.Group>
              <Button variant="primary" className="rounded-pill w-100">
                Subscribe <FaEnvelope />
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Social Media Links */}
        <Row className="text-center mt-4">
          <Col>
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center gap-3">
              <a
                href="https://facebook.com"
                className="text-white fs-4 social-icon"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                className="text-white fs-4 social-icon"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="text-white fs-4 social-icon"
              >
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Copyright */}
      <div
        className="text-center p-3 mt-4"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        &copy; {currentYear} TickTockTreasure | All Rights Reserved.
      </div>

      {/* Additional Styling */}
      <style>
        {`
          .social-icon {
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .social-icon:hover {
            transform: scale(1.2);
            color: #f8d210;
          }
          a.text-white:hover {
            text-decoration: underline;
            color: #f8d210 !important;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
