import React, { Component, PropTypes } from 'react'
import Calendar from './Calendar'

class CalendarList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  handleClick(e) {
    this.props.actions.createCalendar()
  }

  render() {
    const { calendarList, actions } = this.props
    let list = calendarList.map((calendar) => {
      return (
        <Calendar key={ calendar.id }
          actions={ actions }
          calendar={ calendar } />
      )
    })
    return (
      <div className="calendar-list">
        <button
          onClick={ this.handleClick.bind(this) }>Create Calendar</button>
        <ul>
          { list }
        </ul>
      </div>
    )
  }
}

CalendarList.propTypes = {
  calendarList: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default CalendarList
