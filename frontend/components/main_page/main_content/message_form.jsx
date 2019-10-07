import React from 'react';

class MessageForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {body: ''  }
  }

  update(field) {
    return e =>
      this.setState({ [field]: e.target.value })
  }

  handleSubmit(e){
    debugger
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body,
    channel_id: this.props.channel_id,
    author_id: this.props.author_id })
    this.setState({ body: '' })
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" 
          value={this.state.body}
          onChange={this.update('body')}
          placeholder='type message here!'
          />
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default MessageForm