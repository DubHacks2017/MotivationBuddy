import React, {Component} from 'react';
import Modal from './Modal';
import './App.css';
import './App.css';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table-2';
import FacebookLogin from 'react-facebook-login';
import './App.css';

var createReactClass = require('create-react-class');


const rows = [
  "first row",
  "second row",
  "third row"
  // .... and more
];

// Custom cell implementation with special prop
const MyCustomCell = ({ mySpecialProp }) =>
  <Cell>
    {mySpecialProp === "column2" ? "I'm column 2" : "I'm not column 2"}
  </Cell>;

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

    // console.log(this);
  }


  //ReactDOM.render(<Main name={response.name} email={response.email} id={response.id}/>, document.getElementById('welcome-div'));

// Welcome {this.props.name} your email is {this.props.email}
// <div className="Main">
// </div>



  render() {

    return (
      <div className="Main">
      <table data-table="col-four">
  <thead>
    <tr>
      <th>Goal</th>
      <th>Goal Partner</th>
      <th>Reward</th>
      <th>Points</th>
      <th>Deadline</th>
    </tr>
  </thead>
  <tbody>
         {this.state.goals.map(goal =>
          <tr key={goal.goal_id}>
          <td data-heading="Goal">{goal.goal_description}</td>
          <td data-heading="Goal Partner">{goal.recipient_fb_uid}</td>
          <td data-heading="Reward">{goal.reward}</td>
          <td data-heading="Points">{goal.points}</td>
          <td data-heading="Deadline">{goal.deadline}</td>
          </tr>
        )}
         </tbody>
</table>
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
