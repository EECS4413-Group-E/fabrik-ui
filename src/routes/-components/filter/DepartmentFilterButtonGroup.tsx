import { styled } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import React from 'react';
import type { DepartmentCategory } from '../../../models/Filter';

export default function DepartmentFilterButtonGroup({ department, setDepartment }: { department: DepartmentCategory | undefined; setDepartment: (department: DepartmentCategory | undefined) => void }) {


  const handleCategorySelection = (...args: [React.MouseEvent<HTMLElement>, DepartmentCategory | ""]) => {
    const value = args[1];
    if (value=== null|| value ==="") {
      setDepartment(undefined);
    }
    else{
      setDepartment(value);
    }
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
      value={department ?? ""}
      exclusive
      onChange={handleCategorySelection}
      aria-label="department selection"
    >
      <ToggleButton value="" sx={{
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