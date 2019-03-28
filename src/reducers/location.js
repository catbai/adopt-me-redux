export default function locationReducer(state = "New York, NY", action) {
  if (action.type === 'SET_LOCATION') {
    return action.payload;
  } else {
    return state;
  }
}

// test("locationReducer", () => {
//   expect(locationReducer("New York, NY", {type: "SET_LOCATION", payload: "Seattle, WA"})).toBe("Seattle, WA");
// }) redux can generate tests themselves