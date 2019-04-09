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
    createMessage(e){
        e.preventDefault();
        this.messagesRef.push({
            content: this.state.content,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom.key,
            username: this.props.user ? 'Guest' : this.props.user.displayName
        });
        this.setState({content : ''})
     }
     handleChange(e){
         e.preventDefault();
         this.setState({content: e.target.value})
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
           <form className='new-message' onSubmit={(e) => this.createMessage(e)}>
            <input type='text' placeholder='Enter Message Here' onChange={(e) => this.handleChange(e)}/>
            <input type='submit' value='Submit'/>
           </form>
        </div>
        )
    }
}
export default MessageList