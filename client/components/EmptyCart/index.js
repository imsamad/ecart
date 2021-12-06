import { Typography, Box, Button } from "@mui/material";

import Link from "next/link";

const index = () => {
  return (
    <Box
      sx={{
        maxWidth: "sm",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Card Is Empty
      </Typography>
      <Link href="/">
        <Button color="info" variant="contained" size="small" disableElevation>
          Back To Shopping
        </Button>
      </Link>
    </Box>
  );
};

export default index;
