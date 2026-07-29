import { Box, Typography } from '@mui/material';

const PriceRow = ({ label, value }: { label: string; value: number }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
      ${value.toFixed(2)}
    </Typography>
  </Box>
);

export default PriceRow;
