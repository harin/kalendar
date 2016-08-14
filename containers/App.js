import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CalendarList from '../components/CalendarList'
import * as Actions from '../actions'

class App extends Component {
  render() {
    const { calendarList, actions } = this.props
    return (
      <CalendarList calendarList={calendarList} actions={actions}/>
    )
  }
}

App.propTypes = {
  calendarList: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    calendarList: state.calendarList,
    user: {
      id: 'bob',
      name: 'bob'
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
