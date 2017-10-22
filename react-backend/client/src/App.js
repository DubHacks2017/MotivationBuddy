import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import Main from './Main';
import Modal from './Modal';
import ReactDOM from 'react-dom';


class App extends Component {
  state = {users: [],
           isPersonalModalOpen: false,
           isCommonModalOpen: false};

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  responseFacebook(response) {
    this.setState({users: [{'id': 3, 'username': response.name}]});
    console.log(response);
    ReactDOM.render(<Main name={response.name} email={response.email} id={response.id}/>, document.getElementById('root'));
  }

  render() {
    return (
      <div className="App">
        <FacebookLogin
            appId="1136085733193121"
            autoLoad={true}
            fields="name,email,picture"
            scope="user_friends"
            callback={this.responseFacebook.bind(this)}
             />
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        <div>
          <button type="submit" className="btn btn-primary" onClick={() => this.togglePersonalModal()}>Add Personal Goal</button>
          <Modal isOpen={this.state.isPersonalModalOpen} onClose={() => this.togglePersonalModal()}>
            <h1>Add Personal Goal</h1>
            <form>
              <span> Goal name: <input name="personalGoal"></input></span>
            </form>
            <p><button onClick={() => this.togglePersonalModal()}>Close</button></p>
          </Modal>
        </div>

        <div>
          <button type="submit" className="btn btn-primary" onClick={() => this.toggleCommonModal()}>Add Common Goal</button>
          <Modal isOpen={this.state.isCommonModalOpen} onClose={() => this.toggleCommonModal()}>
            <h1>Add Common Goal</h1>
            <form>
              <span> Goal name: <input name="commonGoal"></input></span>
            </form>
            <p><button onClick={() => this.toggleCommonModal()}>Close</button></p>
          </Modal>
        </div>
      </div>
    );
  }


    togglePersonalModal() {
        this.setState({ isPersonalModalOpen: !this.state.isPersonalModalOpen })
    }

    toggleCommonModal() {
        this.setState({ isCommonModalOpen: !this.state.isCommonModalOpen })
    }
}

export default App;
