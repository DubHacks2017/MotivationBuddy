import React, {Component} from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';

class Main extends Component {
  state = {goals: []}

  componentDidMount() {
    fetch('/goals?uid=' + this.props.id)
      .then(res => res.json())
      .then(goals => this.setState({ goals }));
  }

  render() {
    return (
      <div className="Main">
        Welcome {this.props.name} your email is {this.props.email}
      </div>
    )
  }
}

export default Main;
