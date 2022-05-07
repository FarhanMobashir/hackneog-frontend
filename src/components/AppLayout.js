import { Outlet } from "react-router-dom";
import { FooterData } from "../constants/FooterData";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

export const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter footerData={FooterData} />
    </>
  );
};
