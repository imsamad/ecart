import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";

const index = ({ isTrue, noBg }) => {
  return (
    <Box sx={{ height: 4, bgcolor: "secondary.main" }}>
      {isTrue && <LinearProgress color="secondary" />}
    </Box>
  );
};

export default index;
