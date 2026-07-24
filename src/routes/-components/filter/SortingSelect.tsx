import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
    const [sort, setSort] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
    };

    return (
        <Box>
            <FormControl sx={{
                minWidth: 120,
                height: 40,
                border: "1px solid black",
                broderRadius: 0,
                color: "white",

            }}
            size="small">
                <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort"
                    onChange={handleChange}
                >
                    <MenuItem>Newest</MenuItem>
                    <MenuItem>Oldest</MenuItem>
                    <MenuItem>Price: Low to High</MenuItem>
                    <MenuItem>Price: High to Low</MenuItem>
                    <MenuItem>Discount: High to Low</MenuItem>
                    <MenuItem>Discount: Low to High</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}