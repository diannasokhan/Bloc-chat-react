import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms:[],
        }
        this.roomsRef = this.props.database.database().ref('rooms');
    }
    componentDidMount(){
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
           this.setState({rooms: this.state.rooms.concat(room)})
           console.log(this.state.rooms)
        })
    }
 
    render () {
        return (
            <div className='rooms-list'>
                <ul>
                    {this.state.rooms.map((data, index) => 
                    <li className='room-no' key={data.key}>{data.name}</li>)}
                </ul>
            </div>
    )
    }
}
export default RoomList;