import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


var config = {
  apiKey: "AIzaSyApDmFOa1V04SC9gJtXiogolLdI7oXPinQ",
  authDomain: "bloc-chat-react-74e6d.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-74e6d.firebaseio.com",
  projectId: "bloc-chat-react-74e6d",
  storageBucket: "bloc-chat-react-74e6d.appspot.com",
  messagingSenderId: "605575433202"
};
firebase.initializeApp(config);

class App extends Component {
constructor(props){
  super(props)
  this.state={
    activeRoom : ''
  }
}
setActiveRoom(room){
  this.setState({activeRoom: room})
}
  render() {
    return (
      <div className="App">
        <RoomList database={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)}/>
        <MessageList database={firebase} activeRoom={this.state.activeRoom} />
     
      </div>
    );
  }
}

export default App;
