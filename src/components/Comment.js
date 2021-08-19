import React, { Component } from 'react';
import '../App.css';

class Comment extends Component {
  render() {
    return (
      <li key={this.props.id} className="Comment">
        <div>Comment: {this.props.text || "No Comment"}</div>
        <div>Author: {this.props.name || "Anon"} on Date:{this.props.datetime}</div>
      </li>
    );
  }
}
export default Comment;
