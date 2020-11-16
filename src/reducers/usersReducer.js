import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_USER':
      return [...state, action.data]
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const intializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer