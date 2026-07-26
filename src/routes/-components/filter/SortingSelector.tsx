import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortingSelector = ({ sort, setSort }: { sort: string; setSort: (sort: string) => void }) => {

    const handleChange = (event: any) => {
        setSort(event.target.value as string);
        
    };
    return (
        <Box>
            <FormControl sx={{
                minWidth: 120,
                height: 40,
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
                    <MenuItem value="NEWEST">Newest</MenuItem>
                    <MenuItem value="OLDEST">Oldest</MenuItem>
                    <MenuItem value="NAME_ASCENDING">Name: A to Z</MenuItem>
                    <MenuItem value="NAME_DESCENDING">Name: Z to A</MenuItem>
                    <MenuItem value="PRICE_ASCENDING">Price: Low to High</MenuItem>
                    <MenuItem value="PRICE_DESCENDING">Price: High to Low</MenuItem>
                    <MenuItem value="DISCOUNT_ASCENDING">Discount: Low to High</MenuItem>
                    <MenuItem value="DISCOUNT_DESCENDING">Discount: High to Low</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SortingSelector;