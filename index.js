import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()
window.store = store

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

function log() {
  console.log(JSON.stringify(store.getState(),null,2))
}

// log()
// console.log(store.dispatch(actions.addMember('bob')))
// log()
// console.log(store.dispatch(actions.markFree('bob', 1)))
// console.log(store.dispatch(actions.markFree('bob', 2)))
// console.log(store.dispatch(actions.markFree('bob', 30)))
// log()
// console.log(store.dispatch(actions.markBusy('bob', 2)))
// console.log(store.dispatch(actions.markMaybe('bob', 4)))
// log()

