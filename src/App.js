import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { EmptyState } from "./components/EmptyState";
import { PrivateRoute } from "./components/PrivateRoute";
import { ApiProvider } from "./contexts/ApiContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { AllInterview } from "./pages/AllInterviews";
import { AuthPage } from "./pages/AuthPage";
import { CreateInterview } from "./pages/CreateInterview";
import { InterviewPage } from "./pages/InterviewScreen";
import { LandingPage } from "./pages/LandingPage";
import { SingleInterviewPage } from "./pages/SIngleInterviewPage";
import { GlobalStyle } from "./utils";
import errorImage from "./assets/emptyImage.svg";

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <ApiProvider>
          <Router>
            <GlobalStyle />
            <Routes>
              {/* public routes  */}
              <Route path="/" element={<AppLayout />}>
                <Route
                  path="*"
                  exact
                  element={
                    <EmptyState
                      title="404 Error : Page Not found"
                      description="This is not where you should be"
                      onButtonClick={() => console.log("clicked")}
                      buttonText="Create Interviews"
                      imageUrl={errorImage}
                    />
                  }
                />
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route
                  path="/create"
                  element={<PrivateRoute element={<CreateInterview />} />}
                />
                <Route
                  path="/interviews"
                  element={<PrivateRoute element={<AllInterview />} />}
                />
                <Route
                  path="/interviews/:interviewId"
                  element={<PrivateRoute element={<SingleInterviewPage />} />}
                />
              </Route>
              <Route
                path="/interviews/start/:interviewId"
                element={<InterviewPage />}
              />
            </Routes>
          </Router>
        </ApiProvider>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
