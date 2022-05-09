import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BasicButton } from "../components/Buttons";
import { QuestionCard } from "../components/QuestionCard";
import { useApi } from "../contexts/ApiContext";
import { useData } from "../contexts/DataContext";

const MainContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h1``;

export const SingleInterviewPage = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { usegetSingleInterview } = useApi();
  const { loading, data } = usegetSingleInterview(interviewId);
  const { state: globalState } = useData();
  const singleInterview = globalState.singleInterview;
  return (
    <MainContainer>
      <Heading>{singleInterview.name}</Heading>
      {!loading &&
        singleInterview.questions.map((item) => {
          return (
            <QuestionCard
              key={item._id}
              question={item.question}
              answer={item.answer}
            />
          );
        })}
      <BasicButton onClick={() => navigate(`/interviews/start/${interviewId}`)}>
        Join Now
      </BasicButton>
    </MainContainer>
  );
};
