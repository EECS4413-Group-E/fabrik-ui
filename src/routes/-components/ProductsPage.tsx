import { Box, Breadcrumbs, Divider, ToggleButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
import ListingsPageableSection from './ListingsPageableSection';
import FilterBox from './filter/FilterBox';

const ProductsPage = () => {
  const {
    keyword = '',
    pageNumber = 0,
    pageSize = 10,
    department = '',
    category = '',
    deals = false,
  } = useSearch({ from: '/products/' }) as {
    keyword: string;
    pageNumber: number;
    pageSize: number;
    department: DepartmentCategory;
    category: ClothingCategory;
    deals: boolean;
  };

  const [departmentCategories, setDepartmentCategories] = useState<DepartmentCategory | undefined>(
    () => (department === '' ? undefined : (department as DepartmentCategory)),
  );

  const [clothingCategories, setClothingCategories] = useState<ClothingCategory[]>(() => []);
  const [colors, setColors] = useState<ColorCategory[]>(() => []);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [discounted, setDiscounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);

  const [hideDepartmentFilter, setHideDepartmentFilter] = useState<boolean>(department !== '');
  const [hideCategoryFilter, setHideCategoryFilter] = useState<boolean>(category !== '');

  useEffect(() => {
    if (department !== '') {
      setDepartmentCategories(department);
      setHideDepartmentFilter(true);
    } else {
      setHideDepartmentFilter(false);
    }
  }, [department]);

  useEffect(() => {
    if (category !== '') {
      setClothingCategories([category]);
      setHideCategoryFilter(true);
    } else {
      setHideCategoryFilter(false);
    }
  }, [category]);

  useEffect(() => {
    if (deals) {
      setDiscounted(true);
    } else {
      setDiscounted(false);
    }
  }, [deals]);

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
    <Box>
      {/* Search results header */}
      <Box
        sx={{
          mx: 20,
          my: 5,
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            mb: 2,
            letterSpacing: '0.25em',
            color: 'text.secondary',
          }}
        >
          {department !== '' && <Box>{department}</Box>}
          {category !== '' && <Box>{category}</Box>}
          {deals && <Box>HOT SALE</Box>}
        </Breadcrumbs>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ letterSpacing: '0.05em', color: 'text.secondary' }}
        >
          {pageable?.totalElements} items found
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
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
          {!hideDepartmentFilter && (
            <DepartmentFilterButtonGroup
              department={departmentCategories}
              setDepartment={(department) => {
                setDepartmentCategories(department);
              }}
            />
          )}

          {/* Sorting + Filter button  -- grouped */}
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
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
          hideCategoryFilter={hideCategoryFilter}
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
    </Box>
  );
};

export default ProductsPage;
