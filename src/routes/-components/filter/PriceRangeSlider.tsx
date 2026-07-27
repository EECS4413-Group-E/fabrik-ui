import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
    {
        value: 0,
        label: '$0',
    },
    {
        value: 100,
        label: '$100',
    },
    {
        value: 200,
        label: '$200',
    },
    {
        value: 300,
        label: '$300',
    },
    {
        value: 400,
        label: '$400',
    },
    {
        value: 500,
        label: '$500+',
    },

]

function valuetext(value: number) {
    return `${value}`;
}

export default function PriceRangeSlider({ priceRange, setPriceRange }: { priceRange: number[]; setPriceRange: (value: number[]) => void }) {
    const handleChange = (event: Event, newValue: number[]) => {
        setPriceRange(newValue);
    };


    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                marks={marks}
                min={0}
                max={500}
                step={100}
                sx={{
                    
                    "& .MuiSlider-thumb": {
                        backgroundColor: "black",
                        height: 10,
                        width: 10,
                        
                        outline: "1px solid black",
                        outlineOffset: 2,

                    },
                    "& .MuiSlider-track": {
                        backgroundColor: "black",
                        border: "none",
                        height: 0.04,
                        
                    },
                    "& .MuiSlider-rail": {
                        backgroundColor: "black",
                        border: "none",
                        height: 0.05,

                    }

                }}

            />
        </Box>
    );
}