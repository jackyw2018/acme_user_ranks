import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import ReduxThunk from 'redux-thunk';

// ACTION TYPES
const CREATE_USER = 'CREATE_USER';
const FETCH_USERS = 'FETCH_USERS';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';

// ACTION CREATORS
export const createUser = user => {
  return { type: CREATE_USER, user };
};

export const fetchUsers = users => ({
  type: FETCH_USERS,
  users,
});

export const getUsers = () => dispatch => {
  axios.get('/api/users').then(res => dispatch(fetchUsers(res.data)));
};

export const postUser = user => dispatch => {
  axios.post('/api/users', user).then(res => dispatch(createUser(res.data)));
};

export const deleteUser = userId => ({
  type: DELETE_USER,
  userId,
});

export const updateUser = (userId, user) => ({
  type: UPDATE_USER,
  userId,
  user,
});

export const removeUser = userId => dispatch => {
  axios.delete(`/api/users/${userId}`).then(() => {
    dispatch(deleteUser(userId));
  });
};

export const putUser = (user, userId) => dispatch => {
  axios.put(`/api/users/${userId}`, user).then(res => {
    dispatch(updateUser(userId, res.data));
  });
};

// INITIAL STATE
const initialState = {
  users: [],
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, users: [...state.users, action.user] };
    case FETCH_USERS:
      return { ...state, users: action.users };
    case DELETE_USER: {
      const users = state.users.filter(user => user.id !== action.userId);
      return { ...state, users };
    }
    case UPDATE_USER: {
      const users = state.users.filter(
        user => user.id !== Number(action.userId)
      );
      return { ...state, users: [...users, action.user] };
    }
    default:
      return state;
  }
};

// STORE
const store = createStore(reducer, applyMiddleware(ReduxThunk));
export default store;
