
import { styled } from '@mui/material';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import React from 'react';

export default function CategoryFilterButtonGroup({ categories, setCategories }: { categories: string[]; setCategories: (categories: string[]) => void }) {

  const handleCategorySelection = (
    event: React.MouseEvent<HTMLElement>,
    newCategories: string[]
  ) => {
    setCategories(newCategories);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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
  }));

  return (

    <StyledToggleButtonGroup
      sx={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        flexDirection: 'row', 
        gap: 0, p: 1,
        py: 1,
      }}
      value={categories}
      onChange={handleCategorySelection}
      aria-label="department selection"
    >
      {/* <ToggleButton value="all">
        ALL
      </ToggleButton> */}
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