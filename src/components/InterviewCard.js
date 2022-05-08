import styled from "styled-components";
import { BasicButton } from "./Buttons";

const CardContainer = styled.div`
  border: 1px solid black;
  width: 80%;
  padding: 1rem;
`;
const CardTitle = styled.h3``;
const QuestionNumbers = styled.p``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InterviewCard = ({ title, questionNumber, onClick, onDelete }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <QuestionNumbers>{`${questionNumber} Questions`}</QuestionNumbers>
      <ButtonContainer>
        <BasicButton onClick={onClick}>See more</BasicButton>
        <BasicButton onClick={onDelete}>Delete</BasicButton>
      </ButtonContainer>
    </CardContainer>
  );
};
