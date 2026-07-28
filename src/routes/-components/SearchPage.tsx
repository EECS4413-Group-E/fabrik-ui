import { Box, Divider, ToggleButton, Typography } from '@mui/material';
import { useState } from 'react';

import { useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import type {
  ClothingCategory,
  ColorCategory,
  DepartmentCategory,
  Filter,
  SortStrategy,
} from '../../models/Filter';

import { searchQueryOptions } from '../../queries';
import DepartmentFilterButtonGroup from './filter/DepartmentFilterButtonGroup';
import SortingSelector from './filter/SortingSelector';

import FilterListIcon from '@mui/icons-material/FilterList';
import ListingsPageableSection from './ListingsPageableSection.tsx';
import FilterBox from './filter/FilterBox.tsx';

const SearchPage = () => {
  const {
    keyword = '',
    pageNumber = 0,
    pageSize = 10,
  } = useSearch({ from: '/search' }) as {
    keyword: string;
    pageNumber: number;
    pageSize: number;
  };

  const [departmentCategories, setDepartmentCategories] = useState<DepartmentCategory | undefined>(
    () => undefined,
  );
  const [clothingCategories, setClothingCategories] = useState<ClothingCategory[]>(() => []);
  const [colors, setColors] = useState<ColorCategory[]>(() => []);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [discounted, setDiscounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [sort, setSort] = useState('NEWEST' as SortStrategy);

  const handleFilterClear = () => {
    setPriceRange([0, 500]);
    setDepartmentCategories(undefined);
    setClothingCategories([]);
    setColors([]);
    setDiscounted(false);
    setCurrentPage(0);
  };

  const filter: Filter = {
    departmentCategories:
      departmentCategories === undefined || departmentCategories === null
        ? undefined
        : [departmentCategories],
    clothingCategories: clothingCategories.length === 0 ? undefined : clothingCategories,
    colorCategories: colors.length === 0 ? undefined : colors,
    minimumPrice: priceRange[0] === 0 ? undefined : priceRange[0],
    maximumPrice: priceRange[1] === 500 ? undefined : priceRange[1],
    sortStrategy: sort,
    onlyDiscounted: discounted,
  };

  const {
    data: pageable,
    isLoading,
    isError,
  } = useQuery(searchQueryOptions(keyword, filter, currentPage, pageSize));

  return (
    <div>
      {/* Search results header */}
      <Box
        sx={{
          mx: 20,
          my: 5,
        }}
      >
        <Typography sx={{ letterSpacing: '0.25em', color: 'text.secondary' }} gutterBottom>
          SEARCH RESULTS FOR
        </Typography>
        <Typography variant="h2" gutterBottom>
          "{keyword}"
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ letterSpacing: '0.05em', color: 'text.secondary' }}
        >
          {pageable?.totalElements} item{pageable?.totalElements !== 1 ? 's' : ''} found
        </Typography>
      </Box>

      <Divider />
      {/* Main content */}
      <Box
        sx={{
          mx: 20,
        }}
      >
        {/* Filter and sorting options */}
        <Box
          style={{
            display: 'flex',
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: 'space-between',
          }}
        >
          <DepartmentFilterButtonGroup
            department={departmentCategories}
            setDepartment={(department) => {
              setDepartmentCategories(department);
            }}
          />
          {/* Sorting + Filter button  -- grouped */}
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SortingSelector
              sort={sort}
              setSort={(sort) => {
                setSort(sort);
              }}
            />

            <ToggleButton
              value="filters"
              onChange={() => setFiltersOpen(!filtersOpen)}
              sx={{
                ml: 2,
                right: 10,
                height: 40,
                display: 'flex',
                backgroundColor: 'white',
                color: 'black',
                border: `1px solid black`,
                borderRadius: 0,
                '&.Mui-selected': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
              selected={filtersOpen}
            >
              <FilterListIcon sx={{ mr: 1 }} />
              Filters
            </ToggleButton>
          </Box>
        </Box>

        {/* Filter options collapse */}
        <FilterBox
          filtersOpen={filtersOpen}
          priceRange={priceRange}
          setPriceRange={(priceRange) => {
            setPriceRange(priceRange);
          }}
          clothingCategories={clothingCategories}
          setClothingCategories={(categories) => {
            setClothingCategories(categories);
          }}
          colors={colors}
          setColors={(colors) => {
            setColors(colors);
          }}
          discounted={discounted}
          setDiscounted={(discounted) => {
            setDiscounted(discounted);
          }}
          handleFilterClear={handleFilterClear}
          hideCategoryFilter={false}
        />
        <Divider sx={{ my: 2 }} />
      </Box>
      {/* Listings Section */}
      <Box
        sx={{
          mx: 20,
          my: 5,
        }}
      >
        <ListingsPageableSection
          pageable={pageable}
          isLoading={isLoading}
          isError={isError}
          keyword={keyword}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </div>
  );
};

export default SearchPage;
