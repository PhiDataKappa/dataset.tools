//export const ADD_ACCESS_TOKEN = 'ADD_ACCESS_TOKEN';

export function addAccessToken(token) {
  return {
    type: 'ADD_ACCESS_TOKEN',
    text: token
  };
}

export function setShouldRedirect(bool) {
  return {
    type: 'SET_SHOULD_REDIRECT',
    text: bool
  }
}
