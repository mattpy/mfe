import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const AuthApp = React.lazy(() => import("./components/AuthApp"));
const MarketingApp = React.lazy(() => import("./components/MarketingApp"));

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        <React.Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/">
              <MarketingApp />
            </Route>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default App;
