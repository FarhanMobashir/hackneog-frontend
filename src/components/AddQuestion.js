import styled from "styled-components";
import { neutral, primaryColor } from "../utils";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px 0px;
`;
const Input = styled.input`
  border: 2px solid ${neutral[300]};
  padding: 10px 8px;
  border-radius: 5px;
  &:focus {
    outline: 1px solid ${primaryColor[400]};
    border: 1px solid ${primaryColor[400]};
  }
`;

export const AddQuestion = ({
  onQuestionChange,
  onAnswerChange,
  questionValue,
  answerValue,
}) => {
  return (
    <MainContainer>
      <Label>
        Enter question
        <Input
          onChange={onQuestionChange}
          value={questionValue}
          type="text"
          placeholder="Enter question here"
        />
      </Label>
      <Label>
        Enter Answer
        <Input
          onChange={onAnswerChange}
          value={answerValue}
          type="text"
          placeholder="Enter question here"
        />
      </Label>
    </MainContainer>
  );
};
