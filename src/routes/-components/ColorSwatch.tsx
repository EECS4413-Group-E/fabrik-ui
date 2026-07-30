import { Box, Tooltip } from '@mui/material';
import type { ColorCategory } from '../../models/Filter';

const colors = [
  {
    value: '#272727',
    label: 'BLACK',
  },
  {
    value: '#808080',
    label: 'GRAY',
  },
  {
    value: '#FFFFFF',
    label: 'WHITE',
  },
  {
    value: '#FF0000',
    label: 'RED',
  },
  {
    value: '#0000FF',
    label: 'BLUE',
  },
  {
    value: '#FFFF00',
    label: 'YELLOW',
  },
  {
    value: '#00FF00',
    label: 'GREEN',
  },
  {
    value: '#800080',
    label: 'PURPLE',
  },
  {
    value: '#FFFFFF',
    label: 'OTHER',
  },
];

export default function ColorSwatch({ color }: { color: ColorCategory }) {
  return (
    <Tooltip title={color} placement="bottom" arrow>
      <Box
        sx={{
          width: 25,
          height: 25,
          border: '0px',
          borderRadius: 1,
          backgroundColor: colors.find((c) => c.label === color)?.value || 'gray',
        }}
      />
    </Tooltip>
  );
}
