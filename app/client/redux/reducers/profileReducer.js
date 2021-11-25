import {
  PROFILE_INIT,
  PROFILE_SUCC,
  PROFILE_REQ,
  PROFILE_ERR,
} from "../constants/profileConst";

const profileReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_INIT:
      return { ...payload };
    case PROFILE_REQ:
      return { ...state, loading: true, error: false };
    case PROFILE_SUCC:
      return {
        ...state,
        loading: false,
        user: payload.user,
        profileUpdateMsg: payload.profileUpdateMsg,
      };
    case PROFILE_ERR:
      return { ...state, loading: false, error: true, errMsg: payload };
    default:
      return state;
  }
};
export default profileReducer;
