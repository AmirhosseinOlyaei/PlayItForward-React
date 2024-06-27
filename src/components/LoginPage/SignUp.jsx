// src/components/LoginPage/SignUp.jsx
import React, { useState } from "react";
import axios from "axios";
import SharedForm from "./SharedForm";
import SharedLayout from "./SharedLayout";
import TermsAndConditions from "./TermsAndConditions";
import { Box } from "@mui/material";

const SignUp = () => {
  const [openTerms, setOpenTerms] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleTermsClose = (agree) => {
    setAgreeToTerms(agree);
    setOpenTerms(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agreeToTerms) {
      alert("You must agree to the terms and conditions before signing up.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const newUser = {
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`,
        newUser
      );
      alert("User created successfully. Please log in.");
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Error during sign-up. Please try again.");
    }
  };

  const handleTermsClick = (event) => {
    event.preventDefault();
    setOpenTerms(true);
  };

  return (
    <SharedLayout title="Sign up">
      <Box sx={{ width: "100%", maxWidth: "400px" }}>
        <SharedForm
          fields={[
            {
              id: "firstName",
              label: "First Name",
              name: "firstName",
              autoComplete: "given-name",
              autoFocus: true,
              required: true,
            },
            {
              id: "lastName",
              label: "Last Name",
              name: "lastName",
              autoComplete: "family-name",
              required: true,
            },
            {
              id: "email",
              label: "Email Address",
              name: "email",
              autoComplete: "email",
              required: true,
            },
            {
              id: "password",
              label: "Password",
              name: "password",
              autoComplete: "new-password",
              type: "password",
              required: true,
            },
          ]}
          handleSubmit={handleSubmit}
          submitButtonText="Sign Up"
          bottomLinkText="Already have an account? Sign In"
          bottomLinkHref="/login"
          showCheckbox={true}
          handleTermsClick={handleTermsClick}
          agreeToTerms={agreeToTerms}
        />
        <TermsAndConditions
          open={openTerms}
          handleClose={handleTermsClose}
          setOpen={setOpenTerms}
        />
      </Box>
    </SharedLayout>
  );
};

export default SignUp;
