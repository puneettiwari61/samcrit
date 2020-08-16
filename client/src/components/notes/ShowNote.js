import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";

class ShowNote extends React.Component {
  constructor() {
    super();
    this.state = {
      note: ""
    };
  }

  componentDidMount() {
    console.log("from cdm", this.props.match.params.uniqueUrl);
    Axios.get(`/api/v1/notes/${this.props.match.params.uniqueUrl}`)
      .then(res => {
        this.setState({ note: res.data.note.note });
        console.log(res, "get the  note");
      })
      .catch(err => console.log(err, "err form get note"));
  }

  render() {
    return <h1>{this.state.note}</h1>;
  }
}

export default ShowNote;
