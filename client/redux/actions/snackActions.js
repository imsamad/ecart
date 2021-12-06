import { SNACK_OPEN, SNACK_CLOSE } from '../constants/snackConst';

export const openSnack = () => (dispatch) => {
  dispatch({ type: SNACK_OPEN });
};

export const closeSnack = () => (dispatch) => {
  dispatch({ type: SNACK_CLOSE });
};
