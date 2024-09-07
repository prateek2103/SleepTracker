const actionTypes = {
  FETCH_SLEEP_DATA: "FETCH_SLEEP_DATA",
};

export const sleepDataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SLEEP_DATA:
      return {
        ...state,
      };
    default:
      return state;
  }
};
