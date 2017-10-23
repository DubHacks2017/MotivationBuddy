import React, {Component} from 'react';
import Modal from './Modal';
import './App.css';
import FacebookLogin from 'react-facebook-login';

class Main extends Component {
  state = {
    goals: [],
    isPersonalModalOpen: false,
    isCommonModalOpen: false,
    childInput: {}
  }

  addToChildInput(attr, value) {
    var newState = {};
    newState[attr] = value;
    this.setState(newState);
  }

  constructor(props) {
    super(props);
    //insert into DB.
    var payload = JSON.stringify({
     name: this.props.name,
     email: this.props.email,
     uid: this.props.uid
    });
    this.childInput = {};
    fetch('/users', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload
    });
  }



  addGoal() {
    //insert into DB.
    console.log('goal added');
    var payload = JSON.stringify({
     personalGoal: this.state['Goal Description'],
     requester_uid: this.props.uid,
     buddy_id: this.state['Buddy ID'],
     date: this.state['Deadline'],
     points: this.state['Points'],
     reward: this.state['Reward']
    });
    console.log(this.childInput);
    fetch('/goals', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload
    });
    this.updateGoals();
    this.togglePersonalModal();
  }

  componentDidMount() {
    this.updateGoals();
  }

  updateGoals() {
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
            <div>
              <ModalInput inputType="text" label="Goal Description" onChange={this.addToChildInput.bind(this)} value={this.state["Goal Description"]}/>
              <ModalInput inputType="text" label="Buddy ID" onChange={this.addToChildInput.bind(this)} value={this.state["Buddy ID"]}/>
              <ModalInput inputType="date" label="Deadline" onChange={this.addToChildInput.bind(this)} value={this.state["Deadline"]}/>
              <ModalInput inputType="text" label="Points" onChange={this.addToChildInput.bind(this)} value={this.state["Points"]}/>
              <ModalInput inputType="text" label="Reward" onChange={this.addToChildInput.bind(this)} value={this.state["Reward"]}/>
              <p><button onClick={() => this.addGoal()}>Submit</button></p>
              <p><button onClick={() => this.togglePersonalModal()}>Cancel</button></p>
            </div>
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

  updateInputValue(state, evt) {
    this.setState({
      state: evt.target.value
    });
  }

  toggleCommonModal() {
      this.setState({ isCommonModalOpen: !this.state.isCommonModalOpen })
  }
}

class ModalInput extends Component {
  state = {handler: ''}
  //state: label, inputType, input
  constructor(props) {
    super(props);
    // this.state['handler'] = props['onChange'];
    }

  handleChange(e) {
    this.props.onChange(this.props.label, e.target.value);
  }

  render() {
    return (
      <div>
        {this.props.label}
        <input type={this.props.inputType} onChange={ this.handleChange.bind(this)} value={this.props.value} />
      </div>
    );
  }
}

export default Main;
