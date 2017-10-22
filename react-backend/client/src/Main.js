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

        {this.state.goals.map(goal =>
          <div key={goal.goal_id}>{goal.goal_description} with {goal.recipient_fb_uid} having reward {goal.reward} and {goal.points} points</div>
        )}
      </div>
    )
  }
}

export default Main;
