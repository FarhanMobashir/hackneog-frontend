import { Link } from "react-router-dom";
import styled from "styled-components";
import { neutral } from "../utils";
import { CustomLink } from "./CustomLink";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  padding: 20px 0px;
  background-color: ${neutral[300]};
`;
const FooterRowContainer = styled.div``;
const FooterTitle = styled.h2``;
const FooterSubtitle = styled.h5``;
const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const FooterExternalLink = styled.a`
  text-decoration: none;
  color: black;
`;

const FooterRow = ({ title, subtitle, links, isExternal }) => {
  return (
    <FooterRowContainer>
      <FooterTitle>{title}</FooterTitle>
      <FooterSubtitle>{subtitle}</FooterSubtitle>
      <LinksContainer>
        {links.map((item) => {
          if (isExternal) {
            return (
              <FooterExternalLink key={item.name} href={item.link}>
                {item.name}
              </FooterExternalLink>
            );
          } else {
            return (
              <CustomLink key={item.name} to={item.link}>
                {item.name}
              </CustomLink>
            );
          }
        })}
      </LinksContainer>
    </FooterRowContainer>
  );
};

export const AppFooter = ({ footerData }) => {
  return (
    <FooterContainer>
      {footerData.map((item) => {
        return (
          <FooterRow
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            links={item.links}
            isExternal={item.isExternal}
          />
        );
      })}
    </FooterContainer>
  );
};
