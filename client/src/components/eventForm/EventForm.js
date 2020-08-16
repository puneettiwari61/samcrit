import React from "react";
import Axios from "axios";
class EventForm extends React.Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      eventType: "",
      address: "",
      date: "",
      time: "",
      eventAdded: false
    };
  }

  handleEventForm = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log(this.state, "from event from");
    Axios.post(
      `/api/v1/users/addevent`,
      { ...this.state },
      {
        headers: { authorization: JSON.parse(localStorage.eventWork).token }
      }
    )
      .then(res => {
        if (res.data.success) {
          this.setState({ eventAdded: true });
        }
        console.log(res, "res from addevent");
      })
      .catch(err => console.log(err, "error from addevent"));
  };

  render() {
    return (
      <>
        <button
          className="btn-secondary p-2 my-1"
          onClick={() => this.props.history.push("/")}
        >
          See All Events
        </button>
        <h1 className="display-5 text-center text-primary">Add Your Event</h1>
        <div className="container-fluid border rounded-lg p-5 bg-white">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  id="inputEmail4"
                  placeholder="Event name"
                  required
                  onChange={this.handleEventForm}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Event Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  name="eventType"
                  placeholder="Educational / Party .."
                  required
                  onChange={this.handleEventForm}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                onChange={this.handleEventForm}
                name="address"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="inputCity"
                  name="date"
                  onChange={this.handleEventForm}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputZip">Time</label>
                <input
                  type="time"
                  className="form-control"
                  onChange={this.handleEventForm}
                  name="time"
                  id="inputZip"
                  required
                />
              </div>
            </div>
            <div className="form-group" />
            {this.state.eventAdded ? (
              <p className="alert alert-primary">Event added successfully.</p>
            ) : (
              ""
            )}
            <button type="submit" className="btn btn-primary">
              Add Event
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default EventForm;
