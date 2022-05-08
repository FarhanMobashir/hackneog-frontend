import { useState } from "react";
import styled from "styled-components";
import { BasicButton } from "../components/Buttons";
import { TextField } from "../components/TextField";

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
  return (
    <MainContainer>
      <Heading>Signup | Signin</Heading>
      <SubHeading>Welcome to ..... </SubHeading>
      <Form>
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
          <BasicButton>Sign In</BasicButton>
          <BasicButton>Sign Up</BasicButton>
        </ButtonsContainer>
      </Form>
    </MainContainer>
  );
};
