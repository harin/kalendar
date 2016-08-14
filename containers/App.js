import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'

window.actions = TodoActions


class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello Redux!</h1>
      </div>
    )
  }
}

App.propTypes = {

}


function mapStateToProps(state) {
  return {
    calendar: state.calendar
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
