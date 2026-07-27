import { Box, Button, Checkbox, Collapse, Divider, Typography } from "@mui/material";
import { fabrikColors } from "../../../theme";
import PriceRangeSlider from "./PriceRangeSlider";
import CategoryFilterButtonGroup from "./CategoryFilterButtonGroup";
import ColorFilterButtonGroup from "./ColorFilterButtonGroup";
import type { ClothingCategory, ColorCategory } from "../../../models/Filter";

const FilterBox = ({
    filtersOpen,
    priceRange,
    setPriceRange,
    clothingCategories,
    setClothingCategories,
    colors,
    setColors,
    discounted,
    setDiscounted,
    handleFilterClear,
    hideCategoryFilter,
}: {
    filtersOpen: boolean;
    priceRange: number[];
    setPriceRange: (priceRange: number[]) => void;
    clothingCategories: ClothingCategory[];
    setClothingCategories: (categories: ClothingCategory[]) => void;
    colors: ColorCategory[];
    setColors: (colors: ColorCategory[]) => void;
    discounted: boolean;
    setDiscounted: (discounted: boolean) => void;
    handleFilterClear: () => void;
    hideCategoryFilter: boolean;
}) => {
    return (
        <Box>
            <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: fabrikColors.linen,
                    border: `1px solid ${fabrikColors.border}`,
                    px: 2,
                    py: 2,
                }}>
                    {/* Price Range Option */}
                    <Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <Typography>PRICE RANGE</Typography>
                            <Box sx={{
                                display: "flex",
                                gap: 0,
                            }}>
                                <Typography
                                    sx={{
                                        fontFamily: "'Times New Roman', serif",
                                    }}
                                >${priceRange[0]} - ${priceRange[1]}</Typography>
                                {priceRange[1] === 500 && (
                                    <Typography sx={{
                                        fontFamily: "'Times New Roman', serif",
                                    }}>
                                        +
                                    </Typography>
                                )
                                }
                            </Box>
                        </Box>
                        <Box sx={{
                            px: 2,
                            py: 1,
                        }}>

                            <PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    { /* Category Options */}
                    {!hideCategoryFilter && (
                        <Box>
                            <Box>
                                <Typography>
                                    CATEGORY
                                </Typography>
                                <CategoryFilterButtonGroup categories={clothingCategories} setCategories={setClothingCategories} />
                            </Box>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    )}

                    {/* Color Options */}
                    <Box>
                        <Typography>
                            COLOR
                        </Typography>
                        <ColorFilterButtonGroup colors={colors} setColors={setColors} />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    {/* Discounted Options and clear&apply buttons */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",

                        }}>
                            <Typography>
                                DISCOUNTED ONLY
                            </Typography>
                            <Checkbox
                                checked={discounted}
                                onChange={discounted => { setDiscounted(discounted.target.checked); }}
                                slotProps={{
                                    input: { 'aria-label': 'controlled' },
                                }}
                                sx={{
                                    color: "black",
                                    "&.Mui-checked": {
                                        color: "black",

                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            gap: 1,
                        }}>
                            <Button
                                onClick={handleFilterClear}
                                sx={{
                                    height: 40,
                                    width: 80,
                                    border: `1px solid black`,
                                    borderRadius: 0,
                                    color: "black",
                                    "&:hover": {
                                        backgroundColor: "darkred",
                                        color: "white",
                                    },
                                }}
                            >
                                CLEAR
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Collapse>
        </Box>)
}

export default FilterBox;