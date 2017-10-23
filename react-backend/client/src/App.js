import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import Main from './Main';
import ReactDOM from 'react-dom';


class App extends Component {

  responseFacebook(response) {
    console.log(response);
    ReactDOM.render(<Main name={response.name} email={response.email} uid={response.id}/>, document.getElementById('root'));
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
      </div>
    );
  }
}

export default App;
