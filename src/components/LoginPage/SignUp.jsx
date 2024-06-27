import React, { useState } from "react";
import SharedForm from "./SharedForm";
import SharedLayout from "./SharedLayout";
import TermsAndConditions from "./TermsAndConditions";
import { Box } from "@mui/material";
import axios from "axios";

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
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        payload
      );
      alert("User created successfully");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
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
