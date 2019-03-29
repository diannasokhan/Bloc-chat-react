import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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

  render() {
    return (
      <div className="App">
        <RoomList database={firebase}/>
      </div>
    );
  }
}

export default App;
