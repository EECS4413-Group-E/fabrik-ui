import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from '@mui/material';
import type { Size } from '../../../models/Size';

const SIZE_ORDER: Size[] = ['OS', 'XS', 'S', 'M', 'L', 'XL'];

export default function SizeSelectionButtonGroup({
  availabilities,
  selectedSize,
  handleSizeSelection,
}: {
  availabilities: { size: Size; availability: number }[];
  selectedSize: Size;
  handleSizeSelection: (size: Size) => void;
}) {
    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
    margin: 0,

    [`& .${toggleButtonGroupClasses.grouped}`]: {
      border: `1px solid black`,
      [`&.${toggleButtonGroupClasses.selected}`]: {
        color: 'white',
        backgroundColor: 'black',
      },
      [`&:not(.${toggleButtonGroupClasses.selected})`]: {
        color: 'black',
      },
      '&:not(:first-of-type)': {},
    },
  }));      
  const sortedAvailabilities = [...availabilities].sort(
    (a, b) => SIZE_ORDER.indexOf(a.size as Size) - SIZE_ORDER.indexOf(b.size as Size),
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', maxWidth: 400, my: 2 }}
    >
      <StyledToggleButtonGroup
        sx={{
          gap: 2,
          px: 0,
          mx: 0,
        }}
        exclusive
        value={selectedSize}
        onChange={() => handleSizeSelection(selectedSize)}
      >
        {sortedAvailabilities.map((availability) => {
          return (
            <ToggleButton
              sx={{
                    width: 50,
                height: 50,
                px: 0,
                mx: 0,
              }}
              key={availability.size}
              value={availability.size}
              onChange={() => handleSizeSelection(availability.size)}
              disabled={availability.availability === 0}
            >
              {availability.size}
            </ToggleButton>
          );
        })}
      </StyledToggleButtonGroup>
    </Box>
  );
}