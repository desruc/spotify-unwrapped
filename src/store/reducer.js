import * as types from './types';

const initialState = {
  profile: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };

    default:
      return state;
  }
};

export default appReducer;

export const selectProfile = (state) => state.app.profile;
