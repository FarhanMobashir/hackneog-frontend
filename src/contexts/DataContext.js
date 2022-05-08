import { useThunkReducer } from "../hooks/useThunkReducer";
import produce from "immer";
import React from "react";
import { apiActionTypes } from "./ApiContext";

const initialState = {
  interviews: [],
  singleInterview: [],
};

const reducer = produce((state = initialState, action) => {
  // * interview actions

  if (action.type === apiActionTypes.getAllInterview) {
    state.interviews = action.payload.data;
  }

  if (action.type === apiActionTypes.getSingleInterview) {
    state.singleInterview = action.payload.data;
  }

  if (action.type === apiActionTypes.deleteInterview) {
    state.interviews = action.payload.data;
  }

  if (action.type === apiActionTypes.getSinglePlaylist) {
    state.singlePlaylist = action.payload.playlist;
  }

  if (action.type === apiActionTypes.updateSinglePlaylist) {
    state.singlePlaylist = action.payload.playlist;
    state.playlists = state.playlists.map((item) =>
      item._id === action.payload.playlist._id ? action.payload.playlist : item
    );
  }
  if (action.type === apiActionTypes.deleteFromSinglePlaylist) {
    state.singlePlaylist = action.payload.playlist;
    state.playlists = state.playlists.map((item) =>
      item._id === action.payload.playlist._id ? action.payload.playlist : item
    );
  }

  // * clear state
  if (action.type === "clearState") {
    return initialState;
  }
}, initialState);

export const DataContext = React.createContext();
DataContext.displayName = "DataContext";

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
