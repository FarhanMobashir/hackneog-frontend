import styled from "styled-components";
import { BasicButton } from "../components/Buttons";
import { QuestionCard } from "../components/QuestionCard";

const singleInterViewData = {
  id: 1,
  name: "Frontend Developer",
  questions: [
    {
      id: 11,
      question: "What is your name?",
      answer: "My name is what i will say during the interview",
    },
    {
      id: 22,
      question: "Where are you from?",
      answer: "I currently live in my house",
    },
  ],
};

const MainContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h1``;

export const SingleInterviewPage = () => {
  return (
    <MainContainer>
      <Heading>{singleInterViewData.name}</Heading>
      {singleInterViewData.questions.map((item) => {
        return (
          <QuestionCard
            key={item.id}
            question={item.question}
            answer={item.answer}
          />
        );
      })}
      <BasicButton>Join Now</BasicButton>
    </MainContainer>
  );
};
