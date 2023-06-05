import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import GoogleButton from "../../assets/googleButton.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGoogleLoginMutation,
  useGoogleRegisterMutation,
} from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";

const GoogleAuthButton = ({ buttonDisplay }) => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const { userInfo } = useSelector((state) => state.auth);
  const [googleRegister] = useGoogleRegisterMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const responseGoogle = async (response) => {
    // Handle the Google authentication response here
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const name = displayName;
      if (buttonDisplay === "Sign up with Google") {
        const res = await googleRegister({ name, email }).unwrap();
        dispatch(setCredentials({ ...res }));
      } else {
        const res = await googleLogin({ email }).unwrap();
        dispatch(setCredentials({ ...res }));
      }
      navigate(redirect);
      toast.success("Sign In Success");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Button
      variant="outline-primary"
      onClick={responseGoogle}
      className="d-flex align-items-center justify-content-center"
      cursor="pointer"
    >
      <img
        style={{ marginRight: "10px", width: "20px" }}
        src={GoogleButton}
      ></img>
      <strong>{buttonDisplay}</strong>
    </Button>
  );
};

export default GoogleAuthButton;
