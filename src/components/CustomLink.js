import { Link } from "react-router-dom";

export const CustomLink = ({ children, to }) => {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      {children}
    </Link>
  );
};
