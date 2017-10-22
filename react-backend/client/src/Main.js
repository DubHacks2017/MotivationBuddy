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
    //this.state.goals
    fetch('/goals?uid=' + '10203833289708885')
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
