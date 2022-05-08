import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ActiveUser } from "../components/ActiveUser";
import { BasicButton } from "../components/Buttons";
import { TextField } from "../components/TextField";
import { useAuth } from "../contexts/AuthContext";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Heading = styled.h1``;
const SubHeading = styled.h3``;
const Form = styled.form`
  border: 1px solid black;
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
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const signinHandler = (e) => {
    e.preventDefault();
    let data = { email, password };
    setIsDisabled(true);
    fetch("https://hackneog-backend.herokuapp.com/signin", {
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
        }
        setIsDisabled(false);
      })
      .catch((err) => console.log(err));
  };
  if (isAuthenticated()) {
    return <ActiveUser />;
  }
  return (
    <MainContainer>
      <Heading>Signup | Signin</Heading>
      <SubHeading>Welcome to ..... </SubHeading>
      <Form onSubmit={signinHandler}>
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <ButtonsContainer>
          <BasicButton
            disabled={disabled}
            type="submit"
            onClick={signinHandler}
          >
            Sign In
          </BasicButton>
          <BasicButton>Sign Up</BasicButton>
        </ButtonsContainer>
      </Form>
    </MainContainer>
  );
};
