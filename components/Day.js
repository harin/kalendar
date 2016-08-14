import React, { Component, PropTypes } from 'react'

class Day extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  handleClick(e) {
    const { memberId, day, updateStatus } = this.props
    let nextStatus
    switch (day.status) {
      case 'busy':
        nextStatus = 'free'
        break;
      case 'free':
        nextStatus = 'maybe'
        break;
      default:
        nextStatus = 'busy'
    }
    console.log(day.status, nextStatus)
    updateStatus(memberId, day.id, nextStatus)
  }

  render() {
    console.log('rendering', this.props)
    let className = this.props.day.status;
    return <td className={className} onClick={this.handleClick.bind(this)}></td>
  }
}

Day.propTypes = {
  memberId: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired,
  day: PropTypes.object.isRequired
}

export default Day

