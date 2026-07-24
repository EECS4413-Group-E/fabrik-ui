import { Box, Collapse, Pagination, ToggleButton, Typography } from "@mui/material";
import FilterBox from "./filter/FilterBox";
import Divider from '@mui/material/Divider';
import { useEffect, useState } from "react";
import SortingSelect from "./filter/SortingSelect";
import { useSearchMutation } from "../../mutations";
import type { Filter } from '../../models/Filter';

import { useSearch } from '@tanstack/react-router'
import DepartmentFilterButtonGroup from "./filter/DepartmentFilterButtonGroup";


const SearchPage = () => {

    const { keyword } = useSearch({ from: '/search' }) as { keyword: string };

    const [filtersOpen, setFiltersOpen] = useState(false);

    const filter: Filter = {
        departmentCategory: undefined,
        clothingCategory: undefined,
        colorCategory: undefined,
        minimumPrice: undefined,
        maximumPrice: undefined,
        sortStrategy: undefined,
        onlyDiscounted: undefined,
        startRange: undefined,
        endRange: undefined
    }

    const { data: pageable, mutate } = useSearchMutation(keyword, filter);

    useEffect(() => {
        mutate();
    }, [mutate, filter]);

    return (
        <div>
            {/* Search results header */}
            <Box sx={{
                mx: 20,
                my: 5,
            }}
            >
                <Typography>
                    SEARCH RESULTS FOR
                </Typography>
                <Typography variant="h4" gutterBottom>
                    "{keyword}"
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {pageable?.totalElements} results found
                </Typography>
            </Box>


            <Divider />

            {/* Main content */}
            <Box sx={{
                mx: 20,

            }}>
                {/* Filter and sorting options */}
                <Box
                    style={{
                        display: "flex",
                        paddingTop: 10,
                        paddingBottom: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <DepartmentFilterButtonGroup />
                    {/* Sorting + Filter button  -- grouped */}
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <SortingSelect />
                        <ToggleButton
                            value="filters"
                            onChange={() => setFiltersOpen(!filtersOpen)}
                            sx={{
                                ml: 2,
                                right: 10,
                                height: 40,
                                display: "flex",
                                backgroundColor: "white",
                                color: "black",
                                border: `1px solid black`,
                                borderRadius: 0,
                                '&.Mui-selected': {
                                    backgroundColor: "black",
                                    color: "white",
                                },
                            }}
                            selected={filtersOpen}
                        >
                            Filters
                        </ToggleButton>
                    </Box>
                </Box>


                <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                    <FilterBox />
                </Collapse>
                <Divider />
                {pageable?.content?.length === 0 ? (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Typography variant="body1" gutterBottom sx={{
                            fontSize: 50,
                            py: 20
                        }}>
                            We all out of "{keyword}"
                        </Typography>
                    </Box>
                ) : (<Box sx={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Typography variant="body1" gutterBottom sx={{
                        fontSize: 50,
                    }}>
                        We got the good stuff for "{keyword}"
                    </Typography>

                </Box>)}

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    {pageable?.content?.length === 0 ? (
                        <Box></Box>
                    ) : (
                        <Pagination count={pageable?.totalPages} defaultPage={1} siblingCount={0} boundaryCount={2} />
                    )}
                </Box>
            </Box>
        </div>
    )
}

export default SearchPage;