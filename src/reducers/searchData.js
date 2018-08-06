const searchData = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SEARCH_DATA':
      return action.searchData
    default:
      return state
  }
}

export default searchData;
