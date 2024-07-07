import { Component } from "react";
import "./Spinner.css";

interface Props {
  isLoading: boolean;
}

export default class Spinner extends Component<Props> {
  render() {
    if (!this.props.isLoading) {
      return null;
    }
    return (
      <div className="spinner-overlay">
        <div className="spinner" />
      </div>
    );
  }
}
