import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import './style.scss'

let CreateNewRow = React.createClass({
  render() {
    let tds = this.props.row.map((day) => {
      let className = "empty";
      return <td className={className}></td>
    })
    return (
      <tr>
        <td><input name="newRow" placeholder="Enter a name"/></td>
      { tds }
      </tr>
    )
  }
})

let Cell = React.createClass({
  getInitialState() {
    return {
      state: 'empty'
    }
  },
  clickHandler(e) {
    console.log('click')
    if (this.state.state === 'empty')
      this.setState({state: 'free'})
    else
      this.setState({state: 'empty'})
  },
  render() {
    console.log('rendering cell')
    let className = this.state.state;
    return <td className={className} onClick={this.clickHandler}></td>
  }
})

let Row = React.createClass({
  render() {
    let tds = this.props.row.map((day, idx) => {
      return  <Cell state={ null } />
    })
    return (
      <tr>
        <td> Kamsai </td>
      { tds }
      </tr>
    )
  }
})

let Calendar = React.createClass({
  
  getInitialState() {
    let date = new Date();
    let year = date.getYear()
    let month = date.getMonth()
    let daysInMonth = new Date(year, month, 0).getDate();
    let days = Array(daysInMonth).fill().map((v, idx) => {
      return <th>{idx + 1}</th>
    })
    return {
      rows: [days]
    }
  },

  render() {
    let body = this.state.rows.map((row, idx) => {
      return <Row row={row} key={idx}/>
    })
    let header = this.state.rows[0]
    header.unshift(<tr>Name</tr>)
    return (
      <table className="table table-bordered">
        <thead>
          <tr> { header } </tr>
        </thead>
        <tbody>
          { body }
          <CreateNewRow row={this.state.rows[0]} />
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
          <Calendar />
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <App />,
  document.querySelector('.app-container')
);

