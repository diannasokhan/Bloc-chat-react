import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms:[],
            roomName:''
        
        }
        this.roomsRef = this.props.database.database().ref('rooms');
    }
 
    componentDidMount(){
        this.roomsRef.on('child_added', snapshot => {
            const room = {value : snapshot.val(),
            key : snapshot.key};
           this.setState({rooms: this.state.rooms.concat(room)})
           console.log(this.state.rooms)
        })
    }
    handleChange(e){
       this.setState({roomName: e.target.value})
    }
    createRoom(e){
        e.preventDefault();
        this.roomsRef.push({name: this.state.roomName});
        this.setState({ roomName: '' });
    }

    
    
    render () {
        return (
            <div className='rooms-list'>
                <ul>
                    {this.state.rooms.map(data => 

                    <li className='room-no' key={data.key}>{data.value.name}</li>)}
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
