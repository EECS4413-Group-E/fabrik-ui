import { Box, Button, Collapse, Typography } from "@mui/material";
import { useState } from "react";


export default function FilterBox() {
    const [open, setOpen] = useState(false);

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
                <Typography variant="body1" gutterBottom>
                    Category filters
                </Typography>
            </Box>
        </Box>
    );
}
