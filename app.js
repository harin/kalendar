import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import * as firebase from 'firebase'

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


let Cell = React.createClass({
  clickHandler(e) {
    if (this.props.state === 'empty')
      this.props.updateState(this.props.index, 'free')
    else
      this.props.updateState(this.props.index, 'empty')
  },

  render() {
    let className = this.props.state;
    return <td className={className} onClick={this.clickHandler}></td>
  }
})

let Row = React.createClass({
  updateCellState(cellIdx, newState) {
    let row = this.props.row;
    if (!row.data[cellIdx]) row.data[cellIdx] = {};
    row.data[cellIdx].state = newState;
    this.props.updateRow(this.props.index, row);
  },

  removeBtnHandler(e) {
    let sure = confirm('Are you sure you want to remove ' + this.props.row.name + '?')
    if (sure) this.props.removeRow(this.props.index)
  },

  render() {
    let row = this.props.row;
    let tds = row.data.map((day, idx) => {
      let state = 'empty'
      if (day) {
        state = day.state
      }
      return  <Cell state={ state } 
                    updateState={ this.updateCellState } 
                    key={ idx } 
                    index={ idx }/>
    })
    return (
      <tr>
        <td> 
          { row.name } 
          <button className="btn pull-right"
                  onClick={this.removeBtnHandler}
          >x</button>
        </td>
      { tds }
      </tr>
    )
  }
})

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
    console.log('rendering', this.state);
    let body = this.state.rows.map((row, idx) => {
      return <Row row={row} key={idx} index={ idx } 
                  updateRow={ this.updateRow }
                  removeRow={ this.removeRow }/>
    })
    let header = Array(this.state.daysInMonth).fill().map((row, idx) => {
      return <th>{ idx + 1 }</th>
    })
    header.unshift(<tr>Name</tr>)
    return (
      <table className="table table-bordered">
        <thead>
          <tr> { header } </tr>
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

let App = React.createClass({

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Calendar id={ 'kamsai' }/>
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <App />,
  document.querySelector('.app-container')
);

