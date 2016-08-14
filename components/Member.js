import React, { Component, PropTypes } from 'react'
import Day from './day'

class Member extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  removeBtnHandler(e) {
    let sure = confirm('Are you sure you want to remove ' + this.props.row.name + '?')
    if (sure) this.props.removeMember(this.props.member.id)
  }

  render() {
    const { member, updateCellStatus} = this.props
    let tds = member.days.map((day, idx) => {
      return  <Day day={ day }
                  memberId={ member.id }
                  key={ day.id }
                  updateStatus={ updateCellStatus }/>
    })
    return (
      <tr>
        <td>
          { this.props.member.id }
          <button className="btn pull-right"
            onClick={this.removeBtnHandler}>x</button>
        </td>
      { tds }
      </tr>
    )
  }
}

Member.propTypes = {
  updateCellStatus: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired
}

export default Member
