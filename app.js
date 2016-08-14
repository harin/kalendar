import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import * as firebase from 'firebase'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import './style.scss'

// let CreateNewRow = React.createClass({
//   render() {
//     let tds = this.props.row.map((day) => {
//       let className = "empty";
//       return <td className={className}></td>
//     })
//     return (

//     )
//   }
// })
//

console.log('init firebase');
var config = {
  apiKey: "AIzaSyBk6FW05hqGXaH7PaFcyEoW3KbXTitoB10",
  authDomain: "kslendar-58bac.firebaseapp.com",
  databaseURL: "https://kslendar-58bac.firebaseio.com",
  storageBucket: "kslendar-58bac.appspot.com",
};
firebase.initializeApp(config);



let Calendar = React.createClass({
  getDataPath() {
    return `calendar/${this.props.id}`
  },

  componentDidMount() {
    firebase.database().ref(this.getDataPath()).on('value', (snapshot) => {
      this.setState(snapshot.val());
    })
  },

  getInitialState() {
    let date = new Date();
    let year = date.getYear()
    let month = date.getMonth()
    let daysInMonth = new Date(year, month, 0).getDate();
    return {
      month: month+1,
      daysInMonth: daysInMonth,
      rows: []
    }
  },

  componentDidUpdate(prevProps, prevState) {
    firebase.database().ref(this.getDataPath()).set(this.state)
  },

  updateRow(rowIdx, updatedRow) {
    let rows = this.state.rows;
    rows[rowIdx] = updatedRow;
    this.setState({rows: rows});
  },

  removeRow(rowIdx) {
    let rows = this.state.rows;
    rows = rows.slice(0, rowIdx).concat(rows.slice(rowIdx + 1))
    this.setState({rows: rows});
  },

  createRow(name, e) {
    console.log('creating row with name', name)
    let rows = this.state.rows
    let newRow = {
      name: name,
      data: Array(this.state.daysInMonth).fill({
        state: 'empty'
      })
    }
    rows.push(newRow)
    this.setState({rows: rows})

    if (e) {
      e.target.value = ''
    }
  },


  enterKeyUpHandler(e) {
    if (e.keyCode == 13) {
      this.createRow(e.target.value, e)
    }
  },

  render() {
    let body = this.state.rows.map((row, idx) => {
      return <Row row={row} key={idx} index={ idx }
                  updateRow={ this.updateRow }
                  removeRow={ this.removeRow }/>
    })
    let header = Array(this.state.daysInMonth).fill().map((v, idx) => {
      return <th key={idx}>{ idx + 1 }</th>
    })
    header.unshift(<th key="name">Name</th>)
    return (
      <table className="table table-bordered">
        <thead>
          <tr>{ header }</tr>
        </thead>
        <tfoot>
          <tr>
            <td><input name="newRow"
                      placeholder="Enter a name"
                      onKeyUp={ this.enterKeyUpHandler }/>
            </td>
          </tr>
        </tfoot>
        <tbody>
          { body }
        </tbody>
      </table>
    )
  }
})

let uiConfig = {
  'signInSuccessUrl': '/',
  'signInOptions': [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  // 'tosUrl': '<your-tos-url>',
  'callbacks': {
    'signInSuccess': (currentUser, credential, redirectUrl) => {
      console.log(currentUser, credential);
      return true;
    }
  }
};

let ui =  new firebaseui.auth.AuthUI(firebase.auth());
let App = React.createClass({
  getInitialState() {
    return {}
  },

  componentDidMount() {
    // FirebaseUI config.

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user);
        this.setState({user: user})
      } else {
        this.setState({user: null})
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    }, (err) => {
      console.error(err);
    })
  },

  componentDidUpdate() {
    console.log('state', this.state);
  },

  signOut() {
    firebase.auth().signOut()
  },

  render() {
    let accountUI = <div id="firebaseui-auth-container"></div>
    if (this.state.user) {
      accountUI = (
        <div>
        <span className="navbar-text">{ this.state.user.displayName }</span>
        <button className="btn btn-default navbar-btn" onClick={this.signOut}>signout</button>
        </div>
      )
    }

    return (
      <div className="app">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">kslendar</a>
            </div>
            <div className="nav navbar-nav navbar-right">
              {accountUI}
            </div>
          </div>
        </nav>
        <div className="container-fluid" id="main">
          <div className="row">
            <Calendar id={ 'kamsai' }/>
          </div>
        </div>
      </div>

    )
  }
})

ReactDOM.render(
  <App />,
  document.querySelector('.app-container')
);

