import styled from "styled-components";
import { BasicButton } from "../components/Buttons";
import { useState } from "react";
import { neutral, primaryColor } from "../utils";
import { AddQuestion } from "../components/AddQuestion";
const MainContainer = styled.div`
  padding: 20px;
`;
const Heading = styled.h1``;
const SubHeadinng = styled.h3``;
const CreateInterviewContainer = styled.div`
  margin: 20px 0px;
  padding: 20px;
`;

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const questionDataInitial = [
  {
    id: 1,
    question: "What is your name?",
    answer: "My name is what i will say during the interview",
  },
  {
    id: 2,
    question: "Where are you from?",
    answer: "I currently live in my house",
  },
];

const defaultAnswer = "It is subjective";

export const CreateInterview = () => {
  const [questionsData, setQuestionsData] = useState(questionDataInitial);
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(defaultAnswer);

  const addQuestionHandler = () => {
    setShowAddQuestionForm(true);
    if (question !== "") {
      const data = {
        id: questionDataInitial[0].id++,
        question,
        answer,
      };
      setAnswer(defaultAnswer);
      setQuestion("");
      setQuestionsData([...questionsData, data]);
      setShowAddQuestionForm(!showAddQuestionForm);
    }
  };

  return (
    <MainContainer>
      <Heading>Create Interview in just 5 mins</Heading>
      <SubHeadinng>Taking Interview has never been this easy</SubHeadinng>
      <CreateInterviewContainer>
        {questionsData.map((item) => {
          return (
            <QuestionsContainer key={item.id}>
              <Question>{item.question}</Question>
              <Answer>{item.answer}</Answer>
            </QuestionsContainer>
          );
        })}
        {showAddQuestionForm && (
          <AddQuestion
            questionValue={question}
            answerValue={answer}
            onQuestionChange={(e) => setQuestion(e.target.value)}
            onAnswerChange={(e) => setAnswer(e.target.value)}
          />
        )}
        <ButtonContainer>
          <BasicButton onClick={addQuestionHandler}>Add Question +</BasicButton>
          {showAddQuestionForm && (
            <BasicButton
              onClick={() => setShowAddQuestionForm(!showAddQuestionForm)}
            >
              Close
            </BasicButton>
          )}
        </ButtonContainer>
      </CreateInterviewContainer>
      <BasicButton>Create</BasicButton>
    </MainContainer>
  );
};
