import React, { Component } from 'react'

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state={
            messages : [],
            username : '',
            content : '',
            sentAt : '',
            roomId : ''
        }
        this.messagesRef = this.props.database.database().ref('Messages')
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
        {this.state.messages.map(message => {
            if (this.props.activeRoom === message.value.roomId){
                return <li className='messages' key={message.key}> {message.value.username} : {message.value.content}</li>
             }
             else return '';
        }
          )}
        </div>
        )
    }
}
export default MessageList