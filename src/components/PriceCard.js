import styled from "styled-components";
import { neutral } from "../utils";
import { BasicButton } from "./Buttons";

const PriceCardContainer = styled.div`
  border: 5px solid ${neutral[400]};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 300px;
`;
const PriceCardTitle = styled.h2`
  color: ${neutral[500]};
  margin: 0;
`;
const PriceCardSubtitle = styled.h4`
  margin: 0;
  color: ${neutral[500]};
`;
const FeatureContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const FeatureItem = styled.li``;

export const PriceCard = ({
  title,
  subtitle,
  features,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <PriceCardContainer>
      <PriceCardTitle>{title}</PriceCardTitle>
      <PriceCardSubtitle>{subtitle}</PriceCardSubtitle>
      <FeatureContainer>
        {features.map((item) => {
          return <FeatureItem key={item}>{item}</FeatureItem>;
        })}
      </FeatureContainer>
      <BasicButton onClick={buttonOnClick}>{buttonText}</BasicButton>
    </PriceCardContainer>
  );
};
