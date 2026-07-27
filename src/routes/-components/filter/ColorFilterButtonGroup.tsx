import { styled, Tooltip } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import React from 'react';
import type { ColorCategory } from '../../../models/Filter';

export default function ColorFilterButtonGroup({ colors, setColors }: { colors: ColorCategory[]; setColors: (colors: ColorCategory[]) => void }) {

    const handleColorSelection = (...args: [React.MouseEvent<HTMLElement>, ColorCategory[]]) => {
        setColors(args[1]);
    };

    const colorSx = (color: string) => ({
        backgroundColor: color,
        border: '1px solid transparent',
        margin: 0, 
        '&.Mui-selected, &.Mui-selected:hover, &:hover': {
            backgroundColor: color,
            border: '1px solid transparent',
        },
    });

    const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
        [`& .${toggleButtonGroupClasses.grouped}`]: {
            height: 35,
            width: 35,
            maxWidth: 35,
            border: '1px solid transparent',
            [`&.${toggleButtonGroupClasses.selected}`]: {
                opacity: 1,
                outline: `2px solid black`,
            },
            [`&:not(.${toggleButtonGroupClasses.selected})`]: {
                opacity: 0.3,
            },

        },
    });

    return (

        <StyledToggleButtonGroup
            sx={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(35px, 1fr))',
                rowGap: 2,
                columnGap: 2,
            }}
            value={colors}
            onChange={handleColorSelection}
            aria-label="color selection"
        >
            <Tooltip title="Black">
                <ToggleButton value="BLACK" sx={colorSx("black")}/>
            </Tooltip>
            <Tooltip title="Gray">
                <ToggleButton value="GRAY" sx={colorSx("gray")}/>
            </Tooltip>
            <Tooltip title="White">
                <ToggleButton value="WHITE" sx={colorSx("white")}/>
            </Tooltip>
            <Tooltip title="Red">
                <ToggleButton value="RED" sx={colorSx("red")}/>
            </Tooltip>
            <Tooltip title="Blue">
                <ToggleButton value="BLUE" sx={colorSx("blue")}/>
            </Tooltip>
            <Tooltip title="Yellow">
                <ToggleButton value="YELLOW" sx={colorSx("yellow")}/>
            </Tooltip>
            <Tooltip title="Green">
                <ToggleButton value="GREEN" sx={colorSx("green")}/>
            </Tooltip>
            <Tooltip title="Purple">
                <ToggleButton value="PURPLE" sx={colorSx("purple")}/>
            </Tooltip>
            <Tooltip title="Other">
                <ToggleButton value="OTHER" sx={colorSx("white")}>
                    ?
                </ToggleButton>
            </Tooltip>
        </StyledToggleButtonGroup >
    );
}