import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms:[],
            roomName:'',
        
        }
        this.roomsRef = this.props.database.database().ref('rooms');
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
                    {this.state.rooms.map(data => 
                    <li className='room-no' key={data.key} onClick={(room) => this.props.setActiveRoom(room)}>{data.value.name}</li>)}
                </ul>
            <form className='new-room' onSubmit={(e) => this.createRoom(e)}>
                <input type='text' value={this.state.roomName} name='room-name' onChange={(e) => this.handleChange(e)} />
                <input type='submit' value='Submit' />
            </form>
            </div>
    )
    }
}
export default RoomList;
