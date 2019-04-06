import React, { Component } from 'react'

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            username: '',
            content: '',
            sentAt: '',
            roomId: ''
        }
        this.messagesRef = this.props.firebase.database().ref('Messages')
    }
    componentDidMount(){
        this.messagesRef.on('child_added', snapshot => {
         const message = {
             value : snapshot.val(),
             key : snapshot.key};  
         this.setState({messages : this.state.messages.concat(message)})
        })
    }   
   
    render(){
        return(
        <div className='message-list'>
           {this.state.messages
           .filter(message => this.props.activeRoom.key === message.value.roomId)
           .map(message => { 
               return <li className='messages' key={message.key}>
                {message.value.username} : {message.value.content}
                </li> })
           }
        </div>
        )
    }
}
export default MessageList