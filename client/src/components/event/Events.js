import React from "react";
import Axios from "axios";
import { connect } from "react-redux";

import "./events.scss";

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    Axios.get(`/api/v1/users/events`)
      .then(res => {
        this.setState({ events: res.data.events });
        console.log(res.data, "events");
      })
      .catch(err => console.log(err, "error from events"));
  }

  render() {
    return (
      <>
        <div class="fixed-top text-center">
          Welcome
          {this.props.user.currentUser && this.props.user.currentUser.name}
        </div>

        <div className="container p-5 mt-2">
          <h1 className="display-4 text-center">Upcoming Events</h1>
          <button
            className="btn-secondary p-2 my-5"
            onClick={() => this.props.history.push("/addevents")}
          >
            Add Events
          </button>

          <div className="row">
            {this.state.events.map(e => {
              return (
                <div key={e._id} className="col-md-3 col-sm-6 item my-2 ">
                  <div className="card item-card card-block px-2 ">
                    <h4 className="card-title text-right" />
                    <img
                      src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg"
                      alt="Photo of sunset"
                    />
                    <h5 className="item-card-title mt-3 mb-3">{e.eventName}</h5>
                    <p>
                      <span className="font-weight-bold">Category - </span>
                      {e.eventType}
                    </p>
                    <p>
                      <span className="font-weight-bold">Organiser - </span>
                      {e.organiser ? e.organiser : "Organiser"}
                    </p>
                    <p>
                      <span className="font-weight-bold">Date - </span>
                      {e.date}
                    </p>
                    <p>
                      <span className="font-weight-bold">Time - </span>
                      {e.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

function mapToProps({ user }) {
  return { user };
}
export default connect(mapToProps)(Events);
