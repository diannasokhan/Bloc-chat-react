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
        try {
            this.messagesRef.push({
            content: this.state.content,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom.key,
            username: this.props.user ? this.props.user.displayName : 'Guest'
        })}
        catch (err){
            alert('Select Room')
        };
        this.setState({content : ''})
     }
     handleChange(e){
         e.preventDefault();
         this.setState({content: e.target.value})
     }
     handleDelete(id){
        this.setState(prevState =>
            ({messages : prevState.messages.filter(message => message.key !== id)}))
         this.messagesRef.child(id).remove();
     }
     
    render(){
        return(
        <div className='message-list'>
           {this.state.messages
           .filter(message => this.props.activeRoom.key === message.value.roomId)
           .map(message => { 
               return  <div className='messages' key={message.key}>
               <li className='message'>
                {message.value.username} : {message.value.content}
                </li> 
                <button className='delete-button' onClick={() => this.handleDelete(message.key)}>x</button>
             </div>})
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