const flightType = (state = '', action) => {
  switch (action.type) {
    case 'SET_FLIGHT_TYPE':
      return action.flightType
    default:
      return state
  }
}

export default flightType
