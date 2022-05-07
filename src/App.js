import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { EmptyState } from "./components/EmptyState";
import { AuthPage } from "./pages/AuthPage";
import { CreateInterview } from "./pages/CreateInterview";
import { LandingPage } from "./pages/LandingPage";
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
