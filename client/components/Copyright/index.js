import { Divider, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const index = () => {
  const crtYear = new Date().getFullYear();
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" align="center" sx={{ fontWeight: 700 }}>
        Copyright eCart@{crtYear}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          mb: 1,
        }}
      >
        <Link href="https://github.com/imsamad/ecart">Source Code</Link>
        <Link href="https://imsamad.com" sx={{ mx: 2 }}>
          Author
        </Link>
      </Box>
    </Box>
  );
};

export default index;
