import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utilities/AuthRoute";
import MenuBar from "./components/MenuBar";
import pages from "./pages";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={pages.Home} />
          <Route exact path="/posts/:postId" component={pages.Post} />
          <AuthRoute exact path="/login" component={pages.Login} />
          <AuthRoute exact path="/register" component={pages.Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
