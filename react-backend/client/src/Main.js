import React, {Component} from 'react';
import Modal from './Modal';
import './App.css';
import FacebookLogin from 'react-facebook-login';

class Main extends Component {
  state = {goals: [],
  isPersonalModalOpen: false,
  isCommonModalOpen: false}

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
    )
  }

  togglePersonalModal() {
      this.setState({ isPersonalModalOpen: !this.state.isPersonalModalOpen })
  }

  toggleCommonModal() {
      this.setState({ isCommonModalOpen: !this.state.isCommonModalOpen })
  }
}

export default Main;
