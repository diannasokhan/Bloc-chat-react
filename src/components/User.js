import React, { Component } from 'react'

class User extends Component {

    componentDidMount(){
        this.props.firebase.auth().onAuthStateChanged((user) => {
           if(user){
               this.props.setUser(user)
           } else{
               this.props.setUser('')
           }
      })
    }

    signIn(){
    var provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider)
    }

    signOut(){
      this.props.firebase.auth().signOut()
      }


    render() {
        
        return(
            <section className='user-display'>
                <div className='user-display-name'>{this.props.user === null ? '' : this.props.user.displayName}</div>
                <button className='sign-in' onClick={() => this.signIn()}>
                    <span>Sign In</span>
                </button>
                <button className='sign-out' onClick={() => this.signOut()}>
                    <span>Sign Out</span>
                </button>
            </section>
        )
    }
}
export default User