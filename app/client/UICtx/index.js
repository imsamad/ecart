import { useState, createContext, useContext } from 'react';
import LoginDialog from '../components/SignInUp/SignInUpDialog';
import SnackBar from '../components/SnackBar';
const UIContext = createContext();

const UIContextProvider = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const login = { open: handleLoginOpen, close: handleLoginClose };

  const [snackOpen, setSnackOpen] = useState(false);
  const def = {
    position: { h: 'right', v: 'top' },
    body: 'Successfully Done.',
    type: 'success',
  };
  const [snackData, setSnackData] = useState(def);

  const handleSnackOpen = (incomingSnackData) => {
    //To make snake work like Toast.
    if (snackOpen) setSnackOpen(false);
    const isObjNEmpty =
      typeof incomingSnackData === 'object' &&
      Object.keys(incomingSnackData).length === 0;

    if (!isObjNEmpty) {
      setSnackData((prev) => ({ ...prev, ...incomingSnackData }));
      // set to default.
    } else if (isObjNEmpty || !incomingSnackData) {
      setSnackData({ ...def });
    }
    setSnackOpen(true);
  };
  const handleSnackClose = (_event, reason) => {
    // console.log('handleSnackClose', handleSnackClose);
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  const snackBar = {
    open: handleSnackOpen,
    close: handleSnackClose,
  };
  return (
    <UIContext.Provider value={{ login, snackBar }}>
      <LoginDialog open={loginOpen} handleClose={handleLoginClose} />
      <SnackBar
        open={snackOpen}
        handleClose={handleSnackClose}
        snake={snackData}
      />
      {props.children}
    </UIContext.Provider>
  );
};

export const useUICtx = () => useContext(UIContext);

export default UIContextProvider;
