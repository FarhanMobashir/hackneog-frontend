import styled from "styled-components";
import { BasicButton } from "./Buttons";

const CardContainer = styled.div`
  border: 1px solid black;
  width: 80%;
  padding: 1rem;
`;
const CardTitle = styled.h3``;
const QuestionNumbers = styled.p``;

export const InterviewCard = ({ title, questionNumber, onClick }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <QuestionNumbers>{`${questionNumber} Questions`}</QuestionNumbers>
      <BasicButton onClick={onClick}>See more</BasicButton>
    </CardContainer>
  );
};
