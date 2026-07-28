import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  Tooltip,
} from '@mui/material';
import type { Product } from '../../../models/Listing';

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

export default function ColorSelectionButtonGroup({
  products,
  selectedProductIndex,
  handleProductSelection,
}: {
  products: Product[];
  selectedProductIndex: number;
  handleProductSelection: (index: number) => void;
}) {
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',


    [`& .${toggleButtonGroupClasses.grouped}`]: {
      border: `1px solid black`,
      [`&.${toggleButtonGroupClasses.selected}`]: {
        outline: '2px solid black',
        zIndex: 1,
      },
      [`&:not(.${toggleButtonGroupClasses.selected})`]: {
        // outline: 'none',
        opacity: 0.5,
      },
      ['&:hover']: {
        opacity: 1,
      },
    },
  }));

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
        value={selectedProductIndex}
        onChange={() => handleProductSelection(selectedProductIndex)}
      >
        {products.map((product, index) => (
          <Tooltip title={product.colorName}>
            <ToggleButton
              sx={{
                width: 50,
                height: 50,
                px: 0,
                mx: 0,

                [`&.${toggleButtonGroupClasses.selected}`]: {
                  color:
                    colors.find((c) => c.label === (product.colorCategory as string))?.value ??
                    '#CCCCCC',
                  backgroundColor:
                    colors.find((c) => c.label === (product.colorCategory as string))?.value ??
                    '#CCCCCC',
                },
                [`&:not(.${toggleButtonGroupClasses.selected})`]: {
                  color:
                    colors.find((c) => c.label === (product.colorCategory as string))?.value ??
                    '#CCCCCC',
                  backgroundColor:
                    colors.find((c) => c.label === (product.colorCategory as string))?.value ??
                    '#CCCCCC',
                },
              }}
              key={product.id}
              value={index}
              onChange={() => handleProductSelection(index)}
            />
          </Tooltip>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
}
