import React, { Component } from 'react';
import Comment from './Comment'
import '../App.css';

class CommentList extends Component {
  render() {
    let liComments = this.props.comments.map(function(comment) {
                       return <Comment key={comment.id} name={comment.name} text={comment.message} datetime={comment.created}/>;
                     })
    return (
      <ul className="CommentList">
        {liComments}
      </ul>
    );
  }
}

export default CommentList;
