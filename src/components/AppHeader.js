import styled from "styled-components";
import { neutral } from "../utils";
import { CustomLink } from "./CustomLink";
import { CustomedNavLink } from "./CustomNavlink";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

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
  const { isAuthenticated, logout } = useAuth();
  return (
    <HeaderContainer>
      <LogoContainer>
        <CustomLink to="/">
          <Logo>quick-i.</Logo>
        </CustomLink>
      </LogoContainer>
      <NavlinkContainer>
        <ListItem>
          <CustomedNavLink to={`/create`}>Create</CustomedNavLink>
        </ListItem>
        <ListItem>
          <CustomedNavLink to={`/interviews`}>All Interview</CustomedNavLink>
        </ListItem>

        <CustomLink to="/auth">
          <FiUser />
        </CustomLink>
      </NavlinkContainer>
    </HeaderContainer>
  );
};
