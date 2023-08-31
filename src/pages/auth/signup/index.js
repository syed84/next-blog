import Form from "@/components/form";
import SubHeader from "@/components/sub-header";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

function SignUp() {
  const [firstNameError, setFirstNameError] = useState({
    status: false,
    message: "",
  });
  const [lastNameError, setLastNameError] = useState({
    status: false,
    message: "",
  });
  const [emailError, setEmailError] = useState({ status: false, message: "" });
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    status: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const emailValidation = () => {
    let checkEmailValidation =
      credentials.email.toLowerCase().endsWith(".com") ||
      credentials.email.toLowerCase().endsWith(".net") ||
      credentials.email.toLowerCase().endsWith(".ca");
    if (checkEmailValidation && credentials.email.toLowerCase().includes("@")) {
      return { status: false, message: "" };
    }
    return { status: true, message: "Please enter a valid email." };
  };
  const passwordValidation = () => {
    let toUpperCase = credentials.password
      .split("")
      .filter((l) => isNaN(l) && l === l.toUpperCase()).length;
    let toLowerCase = credentials.password
      .split("")
      .filter((l) => isNaN(l) && l === l.toLowerCase()).length;

    const checkPasswordValidation =
      toUpperCase >= 1 && toLowerCase >= 1 && credentials.password.length >= 8;
    if (checkPasswordValidation) {
      return { status: false, message: "" };
    }
    return {
      status: true,
      message:
        "Password must contains Capital and Small characters and must be or or greater than 8 characters",
    };
  };
  const confirmPasswordValidation = () => {
    if (credentials.repeatPassword === credentials.password) {
      return { status: false, message: "" };
    }
    return { status: true, message: "Password is not match" };
  };
  const firstNameValidation = () => {
    if (credentials.firstName.length >= 3) {
      return { status: false, message: "" };
    }
    return {
      status: true,
      message: "First name must be or greater than 3 characters",
    };
  };
  const lastNameValidation = () => {
    if (credentials.lastName.length > 0) {
      return { status: false, message: "" };
    }
    return {
      status: true,
      message: "Last name must be or greater than 1 characters",
    };
  };

  const onSubmit = async () => {
    try {
      setFirstNameError(firstNameValidation());
      setLastNameError(lastNameValidation());
      setEmailError(emailValidation());
      setPasswordError(passwordValidation());
      setConfirmPasswordError(confirmPasswordValidation());
      if (
        !lastNameValidation() ||
        !firstNameValidation() ||
        !emailValidation() ||
        !passwordValidation() ||
        !confirmPasswordValidation()
      ) {
        return;
      }
      setLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok && response.status === 409) {
        alert("User Already Exist");
      }
      if (response.ok) {
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const disabled =
    credentials.email === "" ||
    credentials.password === "" ||
    credentials.firstName === "" ||
    credentials.lastName === "" ||
    credentials.repeatPassword === "";

  const formProps = {
    loading,
    disabled,
    isLogin: false,
    credentials,
    setCredentials,
    onFormSubmit: onSubmit,
    emailError,
    passwordError,
    confirmPasswordError,
    firstNameError,
    lastNameError,
  };
  return (
    <>
      <SubHeader>
        <h2 className="pb-sub-header-title">Sign Up</h2>
      </SubHeader>
      <Form {...formProps} />
    </>
  );
}

export default SignUp;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
