import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { JobProvider } from "./contexts/JobContext";
import Layout from "./components/Layout";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

function App() {
  return (
    <JobProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/step-1" element={<Step1 />} />
            <Route path="/step-2" element={<Step2 />} />
            <Route path="/step-3" element={<Step3 />} />
            <Route path="*" element={<Navigate to="/step-1" replace />} />
          </Routes>
        </Layout>
      </Router>
    </JobProvider>
  );
}

export default App;
