import { useState, createContext, useContext } from 'react';
import LoginDialog from '../components/SignInUp/SignInUpDialog';

const UIContext = createContext();

const UIContextProvider = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const login = { open: handleLoginOpen, close: handleLoginClose };

  return (
    <UIContext.Provider value={{ login, snackBar }}>
      <LoginDialog open={loginOpen} handleClose={handleLoginClose} />

      {props.children}
    </UIContext.Provider>
  );
};

export const useUICtx = () => useContext(UIContext);

export default UIContextProvider;
