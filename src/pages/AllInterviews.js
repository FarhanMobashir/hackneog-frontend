import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { InterviewCard } from "../components/InterviewCard";
import { useApi } from "../contexts/ApiContext";
import { useData } from "../contexts/DataContext";

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
  const { usegetAllInterview, usedeleteInterview } = useApi();
  const { state: globalState } = useData();
  const { loading: isLoadingAllInterview, data: interviewDataFromApi } =
    usegetAllInterview();
  const [deleteInterview, { loading: deletingInterview }] =
    usedeleteInterview();

  const navigate = useNavigate();
  return (
    <MainContainer>
      <Heading>All Interviews</Heading>
      {globalState.interviews.map((item, idx) => {
        return (
          <InterviewCard
            key={idx}
            title={item.name}
            questionNumber={item.questions.length}
            onClick={() => navigate(`/interviews/${item._id}`)}
            onDelete={() => deleteInterview({}, item._id)}
          />
        );
      })}
    </MainContainer>
  );
};
