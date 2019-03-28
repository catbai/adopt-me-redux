export default function changeLocation(location) {
  return { type: 'SET_LOCATION', payload: location };
}

// expect(changeLocation("New York, NY")).toEqual({ type: "SET_LOCATION", payload: "New York, NY" })

// expect(changeLocation("New York, NY")).toEqualSnapShot();