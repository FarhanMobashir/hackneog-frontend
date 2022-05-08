import { EmptyState } from "./EmptyState";
import activeImage from "../assets/boyListening.svg";
import { useAuth } from "../contexts/AuthContext";

export const ActiveUser = () => {
  const { logout } = useAuth();
  return (
    <EmptyState
      title="You are logged in"
      description="We will love if you stay"
      onButtonClick={() => logout()}
      buttonText="Logout"
      imageUrl={activeImage}
    />
  );
};
