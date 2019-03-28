export default function petsReducer(state = [], action) {
  if (action.type === 'SET_PETS') {
    console.log(action.payload);
    return action.payload;
  } else {
    return state;
  }
}
