import React from "react";
import { buildHooks, fetchBaseQuery } from "../helpers/buildApiHooks";
import { AuthContext } from "./AuthContext";
import { useData } from "./DataContext";

export const ApiContext = React.createContext();
ApiContext.displayName = "ApiContext";

export const apiActionTypes = {
  getAllInterview: "getAllInterview",
  getSingleInterview: "getSingleInterview",
  createInterview: "createInterview",
  updateInterview: "updateInterview",
  deleteInterview: "deleteInterview",
};

export const ApiProvider = ({ children }) => {
  const { dispatch: dataProviderDispatch } = useData();
  const { authToken } = React.useContext(AuthContext);

  const headers = {
    authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };

  const privateApi = buildHooks(
    [
      // * interview actions
      {
        name: apiActionTypes.getAllInterview,
        query: "/interview",
        type: "query",
        method: "GET",
      },
      {
        name: apiActionTypes.getSingleInterview,
        query: "/interview",
        type: "query",
        method: "GET",
      },
      {
        name: apiActionTypes.createInterview,
        query: "/interview",
        type: "mutation",
        method: "POST",
      },
      // todo
      {
        name: apiActionTypes.updateInterview,
        query: "/interview",
        type: "mutation",
        method: "PUT",
      },
      {
        name: apiActionTypes.deleteInterview,
        query: "/interview",
        type: "mutation",
        method: "DELETE",
      },
    ],
    fetchBaseQuery({
      baseUrl: "https://hackneog-backend.onrender.com/api",
      // baseUrl: "http://localhost:8080/api",

      headers: headers,
    }),
    dataProviderDispatch
  );

  const value = React.useMemo(() => {
    return {
      ...privateApi,
    };
  }, [privateApi]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => React.useContext(ApiContext);
