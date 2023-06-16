// import { Container, Row, Col } from "react-bootstrap";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer>
//       <Container>
//         <Row>
//           <Col className="text-center py-3">
//             <p>TickTockTreasure &copy; {currentYear}</p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };
// export default Footer;
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-center text-white">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <p>TickTockTreasure &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
