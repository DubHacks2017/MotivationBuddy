import React, {Component} from 'react';
import Modal from './Modal';
import './App.css';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import FacebookLogin from 'react-facebook-login';

var createReactClass = require('create-react-class');


var rows = [];

// Custom cell implementation with special prop
const MyCustomCell = ({ mySpecialProp }) =>
  <Cell>
    {mySpecialProp === "column2" ? "I'm column 2" : "I'm not column 2"}
  </Cell>;

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

    // console.log(this);
  }


  //ReactDOM.render(<Main name={response.name} email={response.email} id={response.id}/>, document.getElementById('welcome-div'));

// Welcome {this.props.name} your email is {this.props.email}
// <div className="Main">
// </div>



  render() {

    var goalsArray = this.state.goals.map( Object.values );

// console.log(this.rows);
//     this.state.goals.forEach((x) => {
//   var tempArray = [];
//   Object.keys(x).forEach((y) => {
//     tempArray.push(y);
//   }
//   this.rows.push(tempArray);

//   console.log(tempArray);
// }

// console.log(this.rows);
    return (
      <div className="Main">

          <Table
    rowHeight={50}
    rowsCount={goalsArray.length}
    width={800}
    maxHeight={400}
    headerHeight={50}>
    <Column
      header={<Cell>Goal</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {goalsArray[rowIndex][3]}
        </Cell>
      )}
      width={200}
    />
    <Column
      header={<Cell>Goal Partner</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {goalsArray[rowIndex][2]}
        </Cell>
      )}
      width={150}
    />
    <Column
      header={<Cell>Reward</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {goalsArray[rowIndex][7]}
        </Cell>
      )}
      width={175}
    />
    <Column
      header={<Cell>Points</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {goalsArray[rowIndex][6]}
        </Cell>
      )}
      width={75}
    />
    <Column
      header={<Cell>Deadline</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
          {goalsArray[rowIndex][5]}
        </Cell>
      )}
      width={100}
    />
    <Column
      header={<Cell>Mark Completed</Cell>}
      cell={({rowIndex, ...props}) => (
        <Cell {...props}>
        <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </Cell>
        )}
      width={100}
    />



  </Table>

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





  //               <div className="Main">

  // <Table
  //   rowHeight={50}
  //   headerHeight={50}
  //   rowsCount={rows.length}
  //   width={800}
  //   height={500}>
  //   <Column
  //     header={<Cell>Col 1</Cell>}
  //     cell={<Cell>Column 1 static content</Cell>}
  //     width={200}
  //   />
  //   <Column
  //     header={<Cell>Col 2</Cell>}
  //     cell={<MyCustomCell mySpecialProp="column2" />}
  //     width={200}
  //   />
  //   <Column
  //     header={<Cell>Col 3</Cell>}
  //     cell={({rowIndex, ...props}) => (
  //       <Cell {...props}>
  //         Data for column 3: {rows[rowIndex]}
  //       </Cell>
  //     )}
  //     width={200}
  //   />
  // </Table>

  //       </div>
