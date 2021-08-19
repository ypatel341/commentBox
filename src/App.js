import React, { Component } from 'react';
import CommentInput from './components/CommentInput'
import CommentList from './components/CommentList'
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      commentBoxes: [],
      commentBoxId: 0
    };
  }

  componentDidMount() {
    this.commentList();
  }

  commentList(){
    fetch('/getComments', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({commentBoxes: data.map(data => data)})
    })
  }

  handleOnSubmit(commentText, commentName){
    //do post call here
    fetch('/createComment', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: commentText, name: commentName}) //update to sampledata
    }).then(res => res.json())
      .then(res => alert("a new comment has been added " + res.id));
    //remember to refresh the list once the comment has been posted
    this.commentList();

  }

  render() {
    return (
      <div className="App">
        <div className="boxesSpace">
          <CommentInput onCommentSubmit={this.handleOnSubmit.bind(this)} />
        </div>
          <CommentList comments={this.state.commentBoxes}/>
      </div>
    );
  }
}


export default App;
