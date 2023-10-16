import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { logout } from "./slices/authSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};
/*

> The Outlet component is used to render the matched child route within
  its parent route. It is typically used within a parent component to
  indicate where child components should be rendered based on the route
  configuration. 

> the Outlet component is used to specify the location where the child
  components should be rendered based on the matched route. The Outlet
  component acts as a placeholder for the content of the child routes.

*/

export default App;
