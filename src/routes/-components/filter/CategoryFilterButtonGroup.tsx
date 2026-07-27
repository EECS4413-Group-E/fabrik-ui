
import { styled } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import React from 'react';

export default function CategoryFilterButtonGroup({ categories, setCategories }: { categories: string[]; setCategories: (categories: string[]) => void }) {

  // const handleCategorySelection = (

  //   newCategories: string[]
  // ) => {
  const handleCategorySelection = (...args: [React.MouseEvent<HTMLElement>, string[]]) => {
    setCategories(args[1]);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)( {
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      height: 40,
      width: 90,
      margin: 0, 
      border: `1px solid black`,
      borderRadius: 0,

      [`&.${toggleButtonGroupClasses.selected}`]: {
        color: "white",
        backgroundColor: "black",
      },
      [`&:not(.${toggleButtonGroupClasses.selected})`]: {
        color: "black",
        backgroundColor: "white",
      },
            '&.Mui-selected, &.Mui-selected:hover, &:hover': {

            border: '1px solid transparent',
        },
      
    },
  });

  return (

    <StyledToggleButtonGroup
      sx={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
        rowGap: 2,
        columnGap: 2,
      }}
      value={categories}
      onChange={handleCategorySelection}
      aria-label="department selection"
    >
      <ToggleButton value="JEAN" sx={{
        px: 5,
      }}>
        Jeans
      </ToggleButton>
      <ToggleButton value="PANT" sx={{
        px: 5,
      }}>
        Pants
      </ToggleButton>
      <ToggleButton value="SHORT" sx={{
        px: 5,
      }}>
        Shorts
      </ToggleButton>
      <ToggleButton value="SHIRT" sx={{
        px: 5,
      }}>
        Shirts
      </ToggleButton>
      <ToggleButton value="SWEATER" sx={{
        px: 5,
      }}>
        Sweaters
      </ToggleButton>
      <ToggleButton value="BAG" sx={{
        px: 5,
      }}>
        Bags
      </ToggleButton>
      <ToggleButton value="SHOES" sx={{
        px: 5,
      }}>
        Shoes
      </ToggleButton>
      <ToggleButton value="HAT" sx={{
        px: 5,
      }}>
        Hat
      </ToggleButton>
      <ToggleButton value="OTHER" sx={{
        px: 5,
      }}>
        Other
      </ToggleButton>
    </StyledToggleButtonGroup >
  );
}