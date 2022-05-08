import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { InterviewCard } from "../components/InterviewCard";

const interViewData = [
  {
    id: 1,
    name: "Frontend Developer",
    questions: 5,
  },
  {
    id: 2,
    name: "Frontend Developer",
    questions: 5,
  },
];

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Heading = styled.h1``;

export const AllInterview = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <Heading>All Interviews</Heading>
      {interViewData.map((item, idx) => {
        return (
          <InterviewCard
            key={idx}
            title={item.name}
            questionNumber={item.questions}
            onClick={() => navigate(`/interviews/${item.id}`)}
          />
        );
      })}
    </MainContainer>
  );
};
