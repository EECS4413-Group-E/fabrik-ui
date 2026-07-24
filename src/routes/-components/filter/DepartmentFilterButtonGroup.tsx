
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

export default function DepartmentFilterButtonGroup() {
  const [department, setDepartment] = React.useState<string | null>('all');

  const handleCategorySelection = (
    event: React.MouseEvent<HTMLElement>,
    newDepartment: string | null
  ) => { 
    setDepartment(newDepartment); 
  };

  return (
    // <ToggleButtonGroup variant="contained" aria-label="Basic button group">
    //   <Button>ALL</Button>
    //   <Button>WOMEN</Button>
    //   <Button>MEN</Button>
    //   <Button>OTHER</Button>
    // </ToggleButtonGroup>
    <ToggleButtonGroup
      value = {department}
      exclusive
      onChange={handleCategorySelection}
      aria-label="department selection"
    >
      <ToggleButton value="all" aria-label="left aligned">
        ALL
      </ToggleButton>
      <ToggleButton value="women" aria-label="centered">
        WOMEN
      </ToggleButton>
      <ToggleButton value="men" aria-label="right aligned">
        MEN
      </ToggleButton>
      <ToggleButton value="other" aria-label="other aligned">
        OTHER
      </ToggleButton>
    </ToggleButtonGroup>
  );
}