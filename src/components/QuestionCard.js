import styled from "styled-components";
import { neutral, primaryColor } from "../utils";

const QuestionsContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0px;
  box-shadow: 0px 0px 4px ${primaryColor[200]};
`;
const Question = styled.h4`
  margin-top: 5px;
`;
const Answer = styled.p`
  color: ${neutral[500]};
  margin: 5px 0px;
`;

export const QuestionCard = ({ question, answer }) => {
  return (
    <QuestionsContainer>
      <Question>{question}</Question>
      <Answer>{answer}</Answer>
    </QuestionsContainer>
  );
};
