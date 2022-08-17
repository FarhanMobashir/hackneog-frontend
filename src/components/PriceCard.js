import styled from "styled-components";
import { neutral } from "../utils";
import { PrimaryButton } from "./Buttons";

const PriceCardContainer = styled.div`
  box-shadow: 0px 0px 10px 0px ${neutral[300]};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 1rem;
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
      <PrimaryButton onClick={buttonOnClick}>{buttonText}</PrimaryButton>
    </PriceCardContainer>
  );
};
