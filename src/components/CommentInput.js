import React, { Component } from 'react';
import '../App.css';

class CommentInput extends Component {
  handleOnSubmit(e) {
    let commentText = this.textInput.value;
    let commentName = this.nameInput.value;
    if (commentText && commentName) {
      this.props.onCommentSubmit(commentText, commentName);
      this.nameInput.value = '';
      this.textInput.value = '';
    }else{ //can add more error handling here to isolate the issue
      window.alert("missing name or comment")
    }
  }
  render() {
    return (
      <div className="CommentInput">
        <div>
          <input ref={(ref) => this.nameInput = ref} type="text" placeholder="name"></input>
        </div>
        <div>
          <textarea ref={(ref) => this.textInput = ref} type="text" placeholder="comment"></textarea>
        </div>
        <button onClick={this.handleOnSubmit.bind(this)}>Comment</button>
      </div>
    );
  }
}

export default CommentInput;
