import {
  PROFILE_SUCC,
  PROFILE_ERR,
  PROFILE_REQ,
} from "../constants/profileConst";

import fetchJson from "../../lib/fetchJson";

const axios = async (data) => {
  const { token } = await fetchJson("/api/user");
  return {
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/updatedetails`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    // can check if data in getState.profile === data
    dispatch({ type: PROFILE_REQ });
    const { data } = await fetchJson(await axios(userData));
    const { user, profileIsDiff, emailIsDiff, message } = data;

    profileIsDiff &&
      (await dispatch({
        type: PROFILE_SUCC,
        payload: {
          user,
          profileUpdateMsg: emailIsDiff ? message : emailIsDiff,
        },
      }));
  } catch (error) {
    console.log("errorerrorerror ", error);
    let msg;
    const doInclude = (val) => error.message.indexOf(val) > -1;

    if (doInclude("Email") || doInclude("email")) {
      msg = error.message;
    } else if (doInclude("Username") || doInclude("username")) {
      msg = error.message;
    } else {
      msg = "Invalid data";
    }
    dispatch({ type: PROFILE_ERR, payload: msg });
  }
};
