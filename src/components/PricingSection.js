import styled from "styled-components";
import { PriceCard } from "./PriceCard";

const PriceSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PriceSectionTitle = styled.h2``;
const PriceCardContainer = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const PricingSection = ({ sectionTitle, pricingPlan }) => {
  return (
    <PriceSectionContainer>
      <PriceSectionTitle>{sectionTitle}</PriceSectionTitle>
      <PriceCardContainer>
        {pricingPlan.map((item) => {
          return (
            <PriceCard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              features={item.features}
            />
          );
        })}
      </PriceCardContainer>
    </PriceSectionContainer>
  );
};
