import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./routes/RouterConfig";
import { AppDataProvider } from "./features/app-data/AppDataContext";

function App() {
  return (
    <AppDataProvider>
      <Router>
        <RouterConfig />
      </Router>
    </AppDataProvider>
  );
}

export default withAuthenticator(App);
