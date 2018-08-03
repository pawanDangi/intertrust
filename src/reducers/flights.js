const flights = (state = [], action) => {
  switch (action.type) {
    case 'SET_FLIGHTS':
      return action.flights
    default:
      return state
  }
}

export default flights
