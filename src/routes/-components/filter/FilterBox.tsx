import { Box, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import ColorButton from "./ColorButton";

const COLOR_OPTIONS = ["red", "blue", "green", "yellow", "black", "white"];

export default function FilterBox() {

    const [colorsSelected, setColorsSelected] = useState<string[]>([]);

    const toggleColor = (color: string) => {
        +        setColorsSelected((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Box
                sx={{
                    mt: 1,
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                <Typography variant="body1" gutterBottom>
                    Price Range
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Color filters
                </Typography>

                <div>
                    {COLOR_OPTIONS.map((color) => (
                    <ToggleButton
                        key={color}
                        value={color}
                        selected={colorsSelected.includes(color)}
                        onChange={() => toggleColor(color)}                       >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                    </ToggleButton>
                    ))}
                </div>
                <Typography variant="body1" gutterBottom>
                    Category filters
                </Typography>
            </Box>
        </Box>
    );
}
