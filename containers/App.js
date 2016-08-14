import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Calendar from '../components/Calendar'
import * as Actions from '../actions'

class App extends Component {
  render() {
    const { calendar, actions } = this.props
    return (
      <Calendar calendar={calendar} actions={actions}/>
    )
  }
}

App.propTypes = {
  calendar: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    calendar: state.calendar
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
