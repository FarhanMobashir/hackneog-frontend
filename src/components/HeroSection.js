import styled from "styled-components";
import { BasicButton } from "./Buttons";

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const HeroContentContainer = styled.div``;
const HeroTitle = styled.h1``;
const HeroSubtitle = styled.h3``;
const HeroImage = styled.img``;

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
