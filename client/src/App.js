import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import { identifyLoggedUser } from "./store/actions";
import Form from "./components/authForm/Form";
import EventForm from "./components/eventForm/EventForm";
import Events from "./components/event/Events";
import Notes from "./components/notes/Notes";
import ShowNote from "./components/notes/ShowNote";

function PublicRoutes(props) {
  return (
    <Switch>
      <Route path="/" exact component={Notes} />
      <Route path="/:uniqueUrl" component={ShowNote} />
      // <Route path="/notes" component={Notes} />
      <Route path="*">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "120px auto",
            fontSize: "2rem"
          }}
        >
          {" "}
          Path not found
        </div>
      </Route>
    </Switch>
  );
}

function PrivateRoutes(props) {
  return (
    <Switch>
      <Route path="/" exact component={Events} />
      <Route path="/addevents" component={EventForm} />
      <Route path="*">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "120px auto",
            fontSize: "2rem"
          }}
        >
          {" "}
          Path not found
        </div>
      </Route>
    </Switch>
  );
}
class App extends Component {
  componentDidMount() {
    this.props.dispatch(identifyLoggedUser());
  }

  render() {
    let user = this.props.user;
    let eventWork = JSON.parse(localStorage.getItem("eventWork"));
    let token = eventWork && eventWork.token;
    return (
      <React.Fragment>
        {token && this.props.user.isAuthInProgress ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "120px auto",
              fontSize: "2rem"
            }}
          >
            LOADING.....
          </div>
        ) : user.currentUser ? (
          <PrivateRoutes />
        ) : (
          <PublicRoutes />
        )}
      </React.Fragment>
    );
  }
}
function mapToProps({ user }) {
  console.log(user, "from mapstatetoprops");
  return { user };
}

export default connect(mapToProps)(App);
