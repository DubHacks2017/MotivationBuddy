import React, {Component} from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';

class Main extends Component {
  state = {goals: []}

  constructor(props) {
    super(props);
    //insert into DB.
    var payload = JSON.stringify({
     name: this.props.name,
     email: this.props.email,
     uid: this.props.uid
    });
    fetch('/goals', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload
    });
  }

  componentDidMount() {
    fetch('/goals?uid=' + this.props.uid)
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
