import { useState, createContext, useContext } from 'react';
import LoginDialog from '../components/Login/LoginDialog';
const UIContext = createContext();

const UIContextProvider = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <UIContext.Provider
      value={{ login: { open: handleLoginOpen, close: handleLoginClose } }}
    >
      <LoginDialog open={loginOpen} handleClose={handleLoginClose} />
      {props.children}
    </UIContext.Provider>
  );
};

export const useUICtx = () => useContext(UIContext);

export default UIContextProvider;
