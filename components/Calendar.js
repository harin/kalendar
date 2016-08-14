import React, { Component, PropTypes } from 'react'
import Member from './member.js'

class Calendar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  handleEnter(e) {
    if (e.keyCode == 13) {
      let memberId = e.target.value
      this.props.actions.addMember(memberId)
    }
  }

  render() {
    let body = this.props.calendar.members.map((member) => {
      return <Member member={ member }
                  key={ member.id }
                  updateCellStatus={ this.props.actions.markStatus }
                  removeMember={ this.props.actions.removeMember }/>
    })
    let header = Array(31).fill().map((v, idx) => {
      return (<th key={idx}>{ idx + 1 }</th>)
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
                  onKeyUp={ this.handleEnter.bind(this) }/>
            </td>
          </tr>
        </tfoot>
        <tbody>
          { body }
        </tbody>
      </table>
    )
  }
}

Calendar.propTypes = {
  calendar: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Calendar
