import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ActiveUser } from "../components/ActiveUser";
import { BasicButton } from "../components/Buttons";
import { TextField } from "../components/TextField";
import { useAuth } from "../contexts/AuthContext";
import { neutral } from "../utils";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.h1``;
const SubHeading = styled.h3``;
const Form = styled.div`
  border: 5px solid ${neutral[300]};
  padding: 4rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [signupEmailError, setSignupEmailError] = useState(false);
  const [signupPasswordError, setSignupPasswordError] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // base url
  // const baseUrl = "http://localhost:8080";
  const baseUrl = "https://hackneog-backend.herokuapp.com";
  const signinHandler = (e) => {
    e.preventDefault();
    let data = { email, password };
    setIsDisabled(true);
    fetch(baseUrl + "/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          login(data.token);
          navigate("/");
          setIsDisabled(false);
        } else {
          setError(true);
          setIsDisabled(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const signUpHandler = (e) => {
    e.preventDefault();
    let data = { email: email.toLocaleLowerCase(), password };
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email) && password.length >= 4) {
      setIsDisabled(true);
      fetch(baseUrl + "/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            login(data.token);
            navigate("/");
            setIsDisabled(false);
          } else {
            setError(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (!emailRegex.test(email)) {
      setSignupEmailError(true);
    }
    if (password.length <= 4) {
      setSignupPasswordError(true);
    }
    if (emailRegex.test(email)) {
      setSignupEmailError(false);
    }
    if (password.length >= 8) {
      setSignupPasswordError(false);
    }
  }, [email, password]);

  if (isAuthenticated()) {
    return <ActiveUser />;
  }
  return (
    <MainContainer>
      <Heading>Signup | Signin</Heading>
      <SubHeading>Welcome to quick-i </SubHeading>
      <Form onSubmit={signinHandler}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          errorText={
            signupEmailError ? "Please enter a valid email" : "Good to go"
          }
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          errorText={
            signupPasswordError
              ? "Your password must contain 8 char , number, and symbol"
              : "Good to go"
          }
        />
        <ButtonsContainer>
          <BasicButton
            disabled={disabled}
            type="submit"
            onClick={signinHandler}
          >
            Sign In
          </BasicButton>
          <BasicButton disabled={disabled} onClick={signUpHandler}>
            Sign Up
          </BasicButton>
        </ButtonsContainer>
        {error && <p>Some error occured please try again</p>}
      </Form>
    </MainContainer>
  );
};
