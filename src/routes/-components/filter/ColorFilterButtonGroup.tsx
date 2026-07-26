
import { styled, Tooltip } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import React from 'react';

export default function ColorFilterButtonGroup({ colors, setColors }: { colors: string[]; setColors: (colors: string[]) => void }) {

    const handleColorSelection = (...args: [React.MouseEvent<HTMLElement>, string[]]) => {
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
                display: 'flex',
                flexDirection: 'row', gap: 1, p: 1,
            }}
            value={colors}
            onChange={handleColorSelection}
            aria-label="color selection"
        >
            <Tooltip title="Black">
                <ToggleButton value="BLACK" sx={colorSx("black")}>
                </ToggleButton>
            </Tooltip>
            <Tooltip title="Gray">
                <ToggleButton value="GRAY" sx={colorSx("gray")}>
                </ToggleButton>
            </Tooltip>
            <Tooltip title="White">
                <ToggleButton value="WHITE" sx={colorSx("white")}>

                </ToggleButton>
            </Tooltip>
            <Tooltip title="Red">
                <ToggleButton value="RED" sx={colorSx("red")}>

                </ToggleButton>
            </Tooltip>
            <Tooltip title="Blue">
                <ToggleButton value="BLUE" sx={colorSx("blue")}>

                </ToggleButton>
            </Tooltip>
            <Tooltip title="Yellow">
                <ToggleButton value="YELLOW" sx={colorSx("yellow")}>

                </ToggleButton>
            </Tooltip>
            <Tooltip title="Green">
                <ToggleButton value="GREEN" sx={colorSx("green")}>

                </ToggleButton>
            </Tooltip>
            <Tooltip title="Purple">
                <ToggleButton value="PURPLE" sx={colorSx("purple")}>

                </ToggleButton>
            </Tooltip>
            <Tooltip title="Other">
                <ToggleButton value="OTHER" sx={colorSx("white")}>
                    ?
                </ToggleButton>
            </Tooltip>
        </StyledToggleButtonGroup >
    );
}