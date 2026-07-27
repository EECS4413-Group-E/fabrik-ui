import { Box, styled, ToggleButton, ToggleButtonGroup, toggleButtonGroupClasses } from "@mui/material";



export default function SizeSelectionButtonGroup({ availabilities, selectedSize, handleSizeSelection }: { availabilities: { size: string; availability: number }[]; selectedSize: string; handleSizeSelection: (size: string) => void }) {

    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(35px, 1fr))',
        [`& .${toggleButtonGroupClasses.grouped}`]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(35px, 1fr))',
            [`&.${toggleButtonGroupClasses.selected}`]: {
                color: "white",
                backgroundColor: "black",
            },
            [`&:not(.${toggleButtonGroupClasses.selected})`]: {
                color: "black",
                backgroundColor: "white",
            },
        }
    }));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap', maxWidth: 400, my: 2 }}>
            {availabilities.map((availability) => (
                <StyledToggleButtonGroup sx={{

                }} exclusive value={selectedSize} onChange={() => handleSizeSelection(availability.size)}>
                    <ToggleButton
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                        key={availability.size}
                        value={availability.size}
                        onChange={() => handleSizeSelection(availability.size)}
                        disabled={availability.availability === 0}>
                        {availability.size}
                    </ToggleButton>
                </StyledToggleButtonGroup>
            ))}
        </Box>
    );
}
