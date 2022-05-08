import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { neutral, primaryColor } from "../utils";
import { BasicButton } from "./Buttons";
import { CustomLink } from "./CustomLink";
import { CustomedNavLink } from "./CustomNavlink";

const HeaderContainer = styled.div`
  background-color: ${neutral[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
`;

const LogoContainer = styled.div``;
const Logo = styled.h1`
  margin: 0;
`;

const NavlinkContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0px 10px;
`;

const ListItem = styled.li`
  list-style-type: none;
`;

export const AppHeader = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <CustomLink to="/">
          <Logo>I.</Logo>
        </CustomLink>
      </LogoContainer>
      <NavlinkContainer>
        {["home", "about"].map((item) => {
          return (
            <ListItem key={item}>
              <CustomedNavLink to="/auth">{item}</CustomedNavLink>
            </ListItem>
          );
        })}
      </NavlinkContainer>
    </HeaderContainer>
  );
};
