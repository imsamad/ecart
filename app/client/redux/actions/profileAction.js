import {
  PROFILE_SUCC,
  PROFILE_ERR,
  PROFILE_REQ,
} from '../constants/profileConst';

import fetchJson from '../../lib/fetchJson';

const axios = async (data) => {
  const { token } = await fetchJson('/api/user');
  return {
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/updatedetails`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    // can check if data in getState.profile === data
    dispatch({ type: PROFILE_REQ });
    const {
      data: { user, noChange },
    } = await fetchJson(await axios(data));
    !noChange &&
      dispatch({
        type: PROFILE_SUCC,
        payload: user,
      });
  } catch (err) {
    dispatch({ type: PROFILE_ERR, payload: 'Invalid data' });
  }
};
