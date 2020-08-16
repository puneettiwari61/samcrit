import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Link } from "react-router-dom";

class Notes extends React.Component {
  constructor() {
    super();
    this.state = {
      note: "",
      link: ""
    };
  }

  handleClick = () => {
    if (this.state.note) {
      console.log(this.state);
      Axios.post("/api/v1/notes", { ...this.state })
        .then(res => {
          console.log(res, "note added");
          this.setState({ link: res.data.note.uniqueUrl });
        })
        .catch(err => console.log("note err"));
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          id="note"
          onChange={e => this.setState({ note: e.target.value })}
          value={this.state.note}
        />
        <button className="btn btn-primary" onClick={this.handleClick}>
          {" "}
          Add Note{" "}
        </button>
        {this.state.link ? (
          <div>
            View your note at{" "}
            <a href={window.location.href + this.state.link}>
              {window.location.href + this.state.link}
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Notes;
