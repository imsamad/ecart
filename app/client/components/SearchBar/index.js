import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from 'next/link';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const index = () => {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState('');
  const q = router.query.q;
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/?q=${keyword}`, undefined, { shallow: true });
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',

              border: 1,
              borderRadius: 1,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              value={keyword}
              onChange={handleChange}
            />
            <IconButton type="submit" sx={{ p: '2px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </form>

        {q && (
          <Link href="/">
            <IconButton
              sx={{ p: '2px', mr: 1 }}
              size="large"
              onClick={() => setKeyword('')}
            >
              <ArrowBackIcon />
            </IconButton>
            {/* <Button
              variant="contained"
              size="small"
              disableElevation
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button> */}
          </Link>
        )}
      </Box>
      <Divider sx={{ mt: 1 }} />
    </>
  );
};
export default index;
const temp = ({ handleSubmit, handleChange, keyword }) => (
  <form onSubmit={handleSubmit}>
    <TextField
      name="searchField"
      label="Search"
      color="secondary"
      type="search"
      variant="outlined"
      value={keyword}
      onChange={handleChange}
      size="small"
    />
  </form>
);
