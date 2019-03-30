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
            const room = {value : snapshot.val(),
            key : snapshot.key};
           this.setState({rooms: this.state.rooms.concat(room)})
        })
    }
 
    render () {
        return (
            <div className='rooms-list'>
                <ul>
                    {this.state.rooms.map(data => 
                    <li className='room-no' key={data.name}>{data.value}</li>)}
                </ul>
            </div>
    )
    }
}
export default RoomList;