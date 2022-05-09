import styled from "styled-components";
import { BasicButton } from "./Buttons";

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;
const HeroContentContainer = styled.div`
  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const HeroTitle = styled.h1`
  @media (max-width: 700px) {
    text-align: center;
  }
`;
const HeroSubtitle = styled.h3`
  @media (max-width: 700px) {
    text-align: center;
  }
`;
const HeroImage = styled.img`
  width: 300px;
`;

export const HeroSection = ({
  title,
  subtitle,
  imageUrl,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <HeroContainer>
      <HeroContentContainer>
        <HeroTitle>{title}</HeroTitle>
        <HeroSubtitle>{subtitle}</HeroSubtitle>
        <BasicButton onClick={buttonOnClick}>{buttonText}</BasicButton>
      </HeroContentContainer>
      <HeroImage src={imageUrl} />
    </HeroContainer>
  );
};
