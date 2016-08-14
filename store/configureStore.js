import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState)

  if (module.hot) {
    // Enable webpack hot module replacement for reducers
    module.hot.accept('../reducers/', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
