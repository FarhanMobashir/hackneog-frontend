import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div>
      <h1>This is header</h1>
      <Outlet />
      <h1>This is footer</h1>
    </div>
  );
};
