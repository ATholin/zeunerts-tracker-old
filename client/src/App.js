import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Places from "./containers/Places/Places";
import Place from "./containers/Place/Place";
import List from "./containers/List/List";
import AddForm from "./containers/AddForm/AddForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Places} />
          <Route path="/add" component={AddForm} />
          <Route path="/place/:id" component={Place} />
          <Route path="/list/:year" component={List} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
