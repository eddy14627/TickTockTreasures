import React from "react";
import { Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "../../assets/googleButton.svg";

const GoogleAuthButton = () => {
  const responseGoogle = (response) => {
    // Handle the Google authentication response here
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <Button
          variant="outline-primary"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="d-flex align-items-center justify-content-center"
          cursor="pointer"
        >
          <img
            style={{ marginRight: "10px", width: "20px" }}
            src={GoogleButton}
          ></img>
          <strong>Sign in with Google</strong>
        </Button>
      )}
    />
  );
};

export default GoogleAuthButton;
