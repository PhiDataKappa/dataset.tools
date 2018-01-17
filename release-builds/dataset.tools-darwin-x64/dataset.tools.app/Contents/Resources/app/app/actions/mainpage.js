/*
export const ADD_ACCESS_TOKEN = 'ADD_ACCESS_TOKEN';

export function addAccessToken(token) {
  return {
    type: ADD_ACCESS_TOKEN,
    text: token
  };
}
*/

export const CHANGE_VIEW = 'CHANGE_VIEW';
export const ADD_USER_DATA = 'ADD_USER_DATA';

export function changeView(view) {
  return {
    type: CHANGE_VIEW,
    text: view
  };
}

export function addUserData(data) {
  return {
    type: ADD_USER_DATA,
    data: data
  }
}
