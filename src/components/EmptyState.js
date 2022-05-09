import styled from "styled-components";
import { BasicButton } from "./Buttons";

const MainContainer = styled.div`
  border: 2px dashed black;
  margin: 2rem;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Heading = styled.h1`
  text-align: center;
`;
const Subheading = styled.h3`
  text-align: center;
`;
const Image = styled.img`
  width: 300px;
`;

export const EmptyState = ({
  title,
  description,
  imageUrl,
  buttonText,
  onButtonClick,
}) => {
  return (
    <MainContainer>
      <Image src={imageUrl} alt="image" />
      <Heading>{title}</Heading>
      <Subheading>{description}</Subheading>
      <BasicButton onClick={onButtonClick}>{buttonText}</BasicButton>
    </MainContainer>
  );
};
