import { composeWithDevTools } from '@redux-devtools/extension'
import { combineReducers, compose, createStore } from 'redux'
import { userReducer } from './reducers/userReducer'

const rootReducer = combineReducers({
	users: userReducer,
})

const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 25,
})

const store = createStore(rootReducer, composeEnhancers())

export { store }
