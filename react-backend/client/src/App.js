import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {users: []};

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    render() {
        return (
            <div className="App">
                <h1> Welcome, {this.state.users.map(user => <span key={user.id}>{user.username}</span>)}!</h1>
                <div className="wrapper">
                    <div className="top">
                        Points: test
                    </div>
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