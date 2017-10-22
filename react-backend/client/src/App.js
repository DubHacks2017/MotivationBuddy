import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  responseFacebook(response) {
    this.setState({users: [{'id': 3, 'username': response.name}]});
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <FacebookLogin
            appId="1373783556053048"
            autoLoad={true}
            fields="name,email,picture"
            scope="user_friends"
            callback={this.responseFacebook.bind(this)}
             />
        <h1> Welcome, {this.state.users.map(user => <span key={user.id}>{user.username}</span>)}!</h1>
        <div className="wrapper">
            <div className="left">
                <button type="submit" className="btn btn-primary">Add Personal Goal</button>
            </div>
            <div className="right">
                <button type="submit" className="btn btn-primary">Add Common Goal</button>
            </div>
        </div>

        </div>
    );
  }
}

export default App;