import blogService from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.login({
      username: credentials.username,
      password: credentials.password
    })

    window.localStorage.setItem(
      'loggedBlogilistaUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const setUserFromLocalStorage = user => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export default loginReducer