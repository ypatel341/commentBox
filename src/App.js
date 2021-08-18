import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      commentBoxes: [],
      //samplecomments: [],
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
      console.log(data)
      //{homes.map(home => <div>{home.name}</div>)}
      this.setState({samplecomments: data.map(data => data.id)})
    })
  }



  addNewCommentBox() {
    let newCommentBoxId = this.state.commentBoxId + 1;
    this.setState({commentBoxId: newCommentBoxId});

    let commentBox = <CommentBox key={this.state.commentBoxId}/>
    this.setState({commentBoxes: this.state.commentBoxes.concat(commentBox)});
    // var sampleData = {
    //   message: "messooo",
    //   name: "yogi"
    // };
    //
    // console.log(this)
    //
    // fetch('/createComment', {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({a: 7, str: 'Some string: &=&'}) //update to sampledata
    // }).then(res => res.json())
    //   .then(res => console.log(res));
    //remember to refresh the list once the comment has been posted
    this.commentList()
  }
  render() {
    return (
      <div className="App">
        <div className="boxesSpace">
           {this.state.commentBoxes.map(function(commentBox) {
             return commentBox;
           })}
        </div>
        <div className="buttonBar">
          <button onClick={this.addNewCommentBox.bind(this)}>Add new commentbox</button>
        </div>


      </div>
    );
  }
}

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentId: 0
    };
  }
  handleOnSubmit(commentText, commentName) {
    let newCommentId = this.state.commentId + 1;
    this.setState({commentId: newCommentId});

    let comment = {id:this.state.commentId, name: commentName, text: commentText}
    this.setState({comments: this.state.comments.concat(comment)});
  }
  render() {
    return (
      <div className="CommentBox">
        <CommentList comments={this.state.comments}/>
        <CommentInput onCommentSubmit={this.handleOnSubmit.bind(this)}/>
      </div>
    );
  }
}


class CommentInput extends Component {

  handleOnSubmit(e) {
    let commentText = this.textInput.value;
    let commentName = this.nameInput.value;
    if (commentText && commentName) { //add potential error handling here
      this.props.onCommentSubmit(commentText, commentName);
      this.nameInput.value = '';
      this.textInput.value = '';
    }
  }
  render() {
    return (
      <div className="CommentInput">
        <input ref={(ref) => this.nameInput = ref} type="text" placeholder="name"></input>
        <input ref={(ref) => this.textInput = ref} type="text" placeholder="comment"></input>
        <button onClick={this.handleOnSubmit.bind(this)}>Send</button>
      </div>
    );
  }
}

class CommentList extends Component {
  render() {
    let liComments = this.props.comments.map(function(comment) {
                       return <Comment key={comment.id} name={comment.name} text={comment.text}/>;
                     })
    return (
      <ul className="CommentList">
        {liComments}
      </ul>
    );
  }
}

class Comment extends Component {
  render() {
    return (
      <li key={this.props.id} className="Comment">
        {this.props.name}: {this.props.text}
      </li>
    );
  }
}

export default App;
