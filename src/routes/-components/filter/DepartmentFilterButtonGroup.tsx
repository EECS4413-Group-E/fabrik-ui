import { styled } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import React from 'react';

export default function DepartmentFilterButtonGroup({ department, setDepartment }: { department: string; setDepartment: (department: string) => void }) {

  const handleCategorySelection = (
    event: React.MouseEvent<HTMLElement>,
    newDepartment: string | "all"
  ) => {
    if (newDepartment === null) {
      newDepartment = "all";
    }
    setDepartment(newDepartment);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      height: 40,
      width: 80,
      margin: theme.spacing(0.5),
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
      
    },
  }));

  return (

    <StyledToggleButtonGroup
      sx={{
        display: 'flex', 
        flexDirection: 'row', gap: 1, p: 1,

      }}
      value={department}
      exclusive
      onChange={handleCategorySelection}
      aria-label="department selection"
    >
      {/* <ToggleButton value="all">
        ALL
      </ToggleButton> */}
      <ToggleButton value="all" sx={{
        px: 5,
      }}>
        ALL
      </ToggleButton>
      <ToggleButton value="WOMENS" sx={{
        px: 5,
      }}>
        WOMEN
      </ToggleButton>
      <ToggleButton value="MENS" sx={{
        px: 5,
      }}>
        MEN
      </ToggleButton>
      <ToggleButton value="OTHER" sx={{
        px: 5,
      }}>
        OTHER
      </ToggleButton>
    </StyledToggleButtonGroup >
  );
}