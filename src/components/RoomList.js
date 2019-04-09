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
       this.setState({
           roomName: e.target.value})
    }
    createRoom(e){
        e.preventDefault();
        this.roomsRef.push({roomName: this.state.roomName});
        this.setState({ roomName: '' });
    }
    render () {
        return (
            <div className='rooms-list'>
                <ul>
                    {this.state.rooms.map(room => 
                    <li className='room-no' key={room.key} onClick={() => this.props.setActiveRoom(room)}>{room.value.name}</li>)}
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
