import { SNACK_OPEN, SNACK_CLOSE } from '../constants/snackConst';

// POST REDUCER
const snackReducer = (state = { open: false }, action) => {
  const { type } = action;
  switch (type) {
    case SNACK_OPEN:
      return { open: true };
    case SNACK_CLOSE:
      return { open: false };
    default:
      return state;
  }
};
export default snackReducer;
