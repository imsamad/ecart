import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { closeSnack } from '../../redux/actions/snackActions';
function MyApp() {
  const { open: snackOpen } = useSelector((state) => state.snack);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const snackKey = React.useRef([]);
  const addKey = (key) => {
    snackKey.current = [...snackKey.current, key];
  };
  const removeKey = (key) => {
    const newKey = snackKey.current.filter((k) => k !== key);
    snackKey.current = [...newKey];
    closeSnackbar(key);
  };
  const handleClose = (key) => {
    removeKey(key);
  };
  const handleClickVariant = (variant) => {
    const key = enqueueSnackbar('Added To Cart!', {
      variant,
      autoHideDuration: 2000,
      action: (key) => {
        return (
          <Link href="/cart">
            <Button
              size="small"
              color="secondary"
              variant="contained"
              disableElevation
              onClick={() => handleClose(key)}
              endIcon={<ShoppingCartIcon />}
            >
              View
            </Button>
          </Link>
        );
      },
      onExited: (_event, key) => {
        removeKey(key);
      },
    });
    addKey(key);
  };

  useEffect(() => {
    if (snackOpen) {
      handleClickVariant('success');
      dispatch(closeSnack());
    }
  }, [snackOpen]);
  return null;
}

export default MyApp;
