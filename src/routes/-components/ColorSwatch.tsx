import { Box } from "@mui/material";

const ColorSwatch = (colorName: string) => {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        border: '0px',
        borderRadius: 1,
      }}
    ></Box>
  );
};

export default ColorSwatch;