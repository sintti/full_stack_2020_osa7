import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  users: usersReducer,
  login: loginReducer,
  notification: notificationReducer,
  blog: blogReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk))

export default store