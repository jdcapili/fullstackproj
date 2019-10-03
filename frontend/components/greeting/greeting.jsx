import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component{
  constructor(props){
    super(props);
    // debugger
    this.state = {
      signLinks: []
    }
  }

  componentDidMount(){
    // debugger
    
    if (this.props.location.pathname === '/signup') {
      // debugger
      this.setState({signLinks: <Link to="/signin" >Sign In</Link>});
    } else if (this.props.location.pathname === '/signin') {
      this.setState({
      signLinks: <Link to="/signup" >Sign Up</Link>});
    } else {
      this.setState({
        signLinks: [<Link to="/signup" key='signup'>Sign Up</Link>,
      <Link to="/signin" key='signin'>Sign In</Link>]})
    }
  }
  
  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname){
      if (this.props.location.pathname === '/signup') {
        // debugger
        this.setState({ signLinks: <Link to="/signin" >Sign In</Link> });
      } else if (this.props.location.pathname === '/signin') {
        this.setState({
          signLinks: <Link to="/signup" >Sign Up</Link>
        });
      } else {
        this.setState({
          signLinks: [<Link to="/signup" key='signup'>Sign Up</Link>,
          <Link to="/signin" key='signin'>Sign In</Link>]
        })
      }
    }
  }
  
  render(){
    const currentUser = this.props.currentUser;

    // debugger
    

    if(currentUser){
      return(
        <div className="sign-links">
          <h2 className='user-greeting'>{currentUser.display_name}</h2>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      )
    } else {
      return(
        <div className="sign-links">
          {this.state.signLinks}
        </div>
      )
    }
  }
}

export default Greeting;