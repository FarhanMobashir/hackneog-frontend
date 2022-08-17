import styled from "styled-components";
import {
  BasicButton,
  OutlineButton,
  PrimaryButton,
} from "../components/Buttons";
import { useEffect, useState } from "react";
import { AddQuestion } from "../components/AddQuestion";
import { QuestionCard } from "../components/QuestionCard";
import { TextField } from "../components/TextField";
import { nanoid } from "nanoid";
import { useApi } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";
const MainContainer = styled.div`
  padding: 20px;
`;
const Heading = styled.h1``;
const SubHeadinng = styled.h3``;
const CreateInterviewContainer = styled.div`
  margin: 20px 0px;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const questionDataInitial = [
  {
    id: nanoid(),
    question: "Dummy Question ?",
    answer: "Dummy Answer",
  },
];

const defaultAnswer = "It is subjective";

export const CreateInterview = () => {
  const [questionsData, setQuestionsData] = useState(questionDataInitial);
  const [interviewName, setInterviewName] = useState("");
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(defaultAnswer);
  const navigate = useNavigate();

  // api calls
  const { usecreateInterview } = useApi();

  const [createInterview, { loading: creatingInterview, data: interViewData }] =
    usecreateInterview();

  const [disabled, setIsDisabled] = useState(false);

  const addQuestionHandler = () => {
    setShowAddQuestionForm(true);
    if (question !== "") {
      const data = {
        id: nanoid(),
        question: question + "?",
        answer,
      };
      setAnswer(defaultAnswer);
      setQuestion("");
      setQuestionsData([...questionsData, data]);
      setShowAddQuestionForm(!showAddQuestionForm);
    }
  };
  useEffect(() => {
    if (!creatingInterview && interViewData) {
      setIsDisabled(false);
      navigate(`/interviews/${interViewData.data._id}`);
    }
    if (creatingInterview) {
      setIsDisabled(true);
    }
  }, [interViewData, creatingInterview]);

  const createInterviewHandler = () => {
    if (interviewName !== "") {
      createInterview({
        name: interviewName,
        questions: questionsData,
      });
    }
  };

  return (
    <MainContainer>
      <Heading>Create Interview in just 5 mins</Heading>
      <SubHeadinng>Taking Interview has never been this easy</SubHeadinng>

      <CreateInterviewContainer>
        <TextField
          label="Enter Interview Name"
          placeholder="Enter name..."
          required={true}
          value={interviewName}
          onChange={(e) => setInterviewName(e.target.value)}
        />
        {questionsData.map((item) => {
          return (
            <QuestionCard
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
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
          <OutlineButton onClick={addQuestionHandler}>
            Add Question +
          </OutlineButton>
          {showAddQuestionForm && (
            <BasicButton
              onClick={() => setShowAddQuestionForm(!showAddQuestionForm)}
            >
              Close
            </BasicButton>
          )}
        </ButtonContainer>
      </CreateInterviewContainer>
      <PrimaryButton
        disabled={disabled}
        onClick={() => createInterviewHandler()}
      >
        Create
      </PrimaryButton>
    </MainContainer>
  );
};
