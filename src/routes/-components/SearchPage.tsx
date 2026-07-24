import { Button, Collapse } from "@mui/material";
import CategoryFilterButtonGroup from "./filter/DepartmentFilterButtonGroup";
import FilterBox from "./filter/FilterBox";
import Divider from '@mui/material/Divider';
import { useEffect, useState } from "react";
import SortingSelect from "./filter/SortingSelect";
import { useSearchMutation } from "../../mutations";
import type { Filter } from '../../models/Filter';

const SearchPage = () => {
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

    const { mutate } = useSearchMutation("", filter);

    useEffect(() => {
        mutate();
    }, [mutate, filter]); 

    return (
        <div>
            <h1>Search Results for "search term"</h1>
            <div style={{ display: "flex" }}>
                <CategoryFilterButtonGroup />
                <SortingSelect />

                <Button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    variant="outlined"
                >
                    {filtersOpen ? "Hide Filters" : "Show Filters"}
                </Button>



            </div>
            <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                <FilterBox />
            </Collapse>
            <Divider />

                <div>THESE ARE THE SEARCH RESULTS</div>
                
            
            <Divider />

        </div>
    )
}

export default SearchPage;