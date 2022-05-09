import styled from "styled-components";
import { neutral, primaryColor } from "../utils";
import { TextField } from "./TextField";

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

export const AddQuestion = ({
  onQuestionChange,
  onAnswerChange,
  questionValue,
  answerValue,
}) => {
  return (
    <MainContainer>
      <TextField
        label="Enter question here"
        value={questionValue}
        onChange={onQuestionChange}
        type="text"
        placeholder="Enter question here"
      />
      <TextField
        label="Enter question here"
        value={answerValue}
        onChange={onAnswerChange}
        type="text"
        placeholder="Enter question here"
      />
    </MainContainer>
  );
};
