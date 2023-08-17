import { composeWithDevTools } from '@redux-devtools/extension'
import { combineReducers, createStore } from 'redux'
import { postReducer } from './reducers/postReducer'
import { storyReducer } from './reducers/storyReducer'
import { userReducer } from './reducers/userReducer'

const rootReducer = combineReducers({
	posts: postReducer,
	story: storyReducer,
	users: userReducer,
})

const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 25,
})

const store = createStore(rootReducer, composeEnhancers())

export { store }
