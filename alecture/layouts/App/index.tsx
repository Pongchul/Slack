import React from "react";
import loadale from "@loadable/component";
import { Redirect, Route, Switch } from "react-router";

const SignUp = loadale(() => import("@pages/SignUp"));
const LogIn = loadale(() => import("@pages/LogIn"));
const Workspace = loadale(() => import("@layouts/Workspace"));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace" component={Workspace} />
    </Switch>
  );
};

export default App;

// pages - 서비스 페이지
// components - 짜잘한 컴포넌트
// layouts - 공통 레이아웃
