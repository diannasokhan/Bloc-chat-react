import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms:[],
            roomName:'',
        
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }
 
    componentDidMount(){
        this.roomsRef.on('child_added', snapshot => {
            const room = {value : snapshot.val(),
            key : snapshot.key};
           this.setState({rooms: this.state.rooms.concat(room)})
        })
    }
    handleChange(e){
       e.preventDefault();
       this.setState({
           roomName: e.target.value})
    }
    createRoom(e){
        e.preventDefault();
        this.roomsRef.push({name: this.state.roomName});
        this.setState({ roomName: '' });
    }
    deleteRoom(id){
        this.setState(prevState => ({
            rooms: prevState.rooms.filter(room => room.key !== id)
        }));
        this.roomsRef.child(id).remove();
    }
   
    render () {
        return (
            <div className='rooms-list'>
                <ul>
                    {this.state.rooms.map(room =>
                    <div className='rooms' key={room.key}>
                        <li className='room-no' onClick={() => this.props.setActiveRoom(room)}>{room.value.name}</li>
                        <button className='delete-button' onClick={() => this.deleteRoom(room.key)}>x</button>
                    </div> 
                    )}
                </ul>
            <form className='new-room' onSubmit={(e) => this.createRoom(e)}>
                <input type='text' value={this.state.roomName} name='room-name' onChange={(e) => this.handleChange(e)} placeholder='New Room'/>
                <input type='submit' value='Submit' />
            </form>
            </div>
    )
    }
}
export default RoomList;
