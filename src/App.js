import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);