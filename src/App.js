import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { EmptyState } from "./components/EmptyState";
import { AllInterview } from "./pages/AllInterviews";
import { AuthPage } from "./pages/AuthPage";
import { CreateInterview } from "./pages/CreateInterview";
import { InterviewPage } from "./pages/InterviewScreen";
import { LandingPage } from "./pages/LandingPage";
import { SingleInterviewPage } from "./pages/SIngleInterviewPage";
import { GlobalStyle } from "./utils";

function App() {
  return (
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
              // title="404 Error : Page Not found"
              // description="This is not where you should be"
              // onButtonClick={() => navigate("/videos")}
              // buttonText="Watch Videos"
              // imageUrl={errorImage}
              />
            }
          />
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/create" element={<CreateInterview />} />
          <Route path="/interviews" element={<AllInterview />} />
          <Route
            path="/interviews/:interviewId"
            element={<SingleInterviewPage />}
          />
        </Route>
        <Route
          path="/interviews/start/:interviewId"
          element={<InterviewPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
