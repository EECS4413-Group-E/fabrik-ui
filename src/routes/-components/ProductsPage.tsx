import { Box, Breadcrumbs, Button, Checkbox, CircularProgress, Collapse, Divider, IconButton, Pagination, ToggleButton, Typography, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useSearch } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";

import { useRemoveWishlistMutation } from "../../mutations";

import type { Filter } from '../../models/Filter';

import { searchQueryOptions } from "../../queries";

import DepartmentFilterButtonGroup from "./filter/DepartmentFilterButtonGroup";
import PriceRangeSlider from "./filter/PriceRangeSlider";
import CategoryFilterButtonGroup from "./filter/CategoryFilterButtonGroup";
import ColorFilterButtonGroup from "./filter/ColorFilterButtonGroup";
import SortingSelector from "./filter/SortingSelector";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import { fabrikColors } from "../../theme";

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

const ProductsPage = () => {
  const { keyword = '' } = useSearch({ from: '/products' }) as { keyword: string };
  const { pageNumber = 0 } = useSearch({ from: '/products' }) as { pageNumber: number };
  const { pageSize = 10 } = useSearch({ from: '/products' }) as { pageSize: number };


  const { department = '' } = useSearch({ from: '/products' }) as { department: string };
  const { category = '' } = useSearch({ from: '/products' }) as { category: string };
  const { deals = false } = useSearch({ from: '/products' }) as { deals: boolean };

  const [departmentCategories, setDepartmentCategories] = useState<string>("all");
  const [clothingCategories, setClothingCategories] = useState<string[]>(() => []);
  const [colors, setColors] = useState<string[]>(() => []);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [discounted, setDiscounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(pageNumber);

  // const { mutate: removeWishlistItem, isPending: isRemoving, variables: removingListingId } = useRemoveWishlistMutation();

  const [hideDepartmentFilter, setHideDepartmentFilter] = useState<boolean>(department !== '');
  const [hideCategoryFilter, setHideCategoryFilter] = useState<boolean>(category !== '');



  useEffect(() => {
    if (department !== '') {
      setDepartmentCategories(department);
      setHideDepartmentFilter(true);
    }
  }, [department]);

  useEffect(() => {
    if (category !== '') {
      setClothingCategories([category]);
      setHideCategoryFilter(true);
    }
  }, [category]);

  useEffect(() => {
    if (deals === true) {
      setDiscounted(true);
    }
    else {
      setDiscounted(false);
    }
  }, [deals]);

  const { mutate: removeWishlistItem, isPending: isRemoving, variables: removingListingId } = useRemoveWishlistMutation();


  const [filtersOpen, setFiltersOpen] = useState(false);

  const [sort, setSort] = React.useState("NEWEST");

  const handleFilterClear = () => {
    setPriceRange([0, 500]);
    setDepartmentCategories("all");
    setClothingCategories([]);
    setColors([]);
    setDiscounted(false);
    setCurrentPage(0);
  }

  const filter: Filter = {
    departmentCategories: departmentCategories === "all" ? undefined : [departmentCategories],
    clothingCategories: clothingCategories.length === 0 ? undefined : clothingCategories,
    colorCategories: colors.length === 0 ? undefined : colors,
    minimumPrice: priceRange[0] === 0 ? undefined : priceRange[0],
    maximumPrice: priceRange[1] === 500 ? undefined : priceRange[1],
    sortStrategy: sort,
    onlyDiscounted: discounted,
  }

  const { data: pageable, isLoading, isError, error } = useQuery(searchQueryOptions(keyword, filter, currentPage, pageSize));

  return (
    <div>
      {/* Search results header */}
      <Box sx={{
        mx: 20,
        my: 5,
      }}
      >

        <Breadcrumbs aria-label="breadcrumb" sx={{
          mb: 2,
        }}>
          {department !== '' && (
            <Box>
              {department}
            </Box>
          )}
          {category !== '' && (
            <Box>
              {category}
            </Box>
          )}
          {deals && (
            <Box>
              HOT SALE
            </Box>
          )}
        </Breadcrumbs>
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
          {
            !hideDepartmentFilter ? (
              <DepartmentFilterButtonGroup department={departmentCategories} setDepartment={(department) => { setDepartmentCategories(department); }} />
            ) : (<Box></Box>)
          }
          {/* Sorting + Filter button  -- grouped */}
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <SortingSelector sort={sort} setSort={(sort) => { setSort(sort); }} />

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
              <FilterListIcon sx={{ mr: 1 }} />
              Filters
            </ToggleButton>
          </Box>
        </Box>

        {/* Filter options collapse */}
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

                <PriceRangeSlider value={priceRange} setValue={setPriceRange} />
              </Box>
              <Divider sx={{ my: 2 }} />
            </Box>

            { /* Category Options */}
            {!hideCategoryFilter && (
              <Box>
                <Typography>
                  CATEGORY
                </Typography>
                <CategoryFilterButtonGroup categories={clothingCategories} setCategories={setClothingCategories} />
                <Divider sx={{ my: 2 }} />
              </Box>
            )}


            {/* Color Options */}
            <Box>
              <Typography>
                COLOR
              </Typography>
              <ColorFilterButtonGroup colors={colors} setColors={setColors} />
              <Divider sx={{ my: 2 }} />
            </Box>
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
                {/* <Button
                                    onClick={handleSearch}
                                    sx={{
                                        height: 40,
                                        width: 80,
                                        border: `1px solid black`,
                                        borderRadius: 0,
                                        color: "black",
                                        "&:hover": {
                                            backgroundColor: "black",
                                            color: "white",
                                        },
                                    }}
                                >
                                    APPLY
                                </Button> */}
              </Box>
            </Box>

          </Box>
        </Collapse>
        <Divider sx={{ my: 2 }} />

        {/* Search results */}
        <Box>
          {isLoading && (
            <Box sx={{
              display: "flex",
              justifyContent: "center",
            }}>
              <CircularProgress sx={{ margin: 'auto' }} />
            </Box>
          )}
          {!isLoading && !isError && pageable?.content?.length === 0 ? (
            <Box sx={{
              display: "flex-column",
              justifyContent: "center",
              alignItems: "center",

              py: 20,
            }}>
              <Typography variant="body1" gutterBottom sx={{

                fontSize: 50,
                justifyContent: "center",
                alignItems: "center",

              }}>
                We don't have any results for "{keyword}"
              </Typography>
              <Typography variant="body1" gutterBottom sx={{
                fontSize: 30,

              }}>
                Try a different keyword, or change your filters to find what you're looking for.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  md: 'repeat(3, minmax(0, 1fr))',
                  lg: 'repeat(4, minmax(0, 1fr))',
                  xl: 'repeat(5, minmax(0, 1fr))',
                },
                gap: { xs: 4, sm: 2.5 },
                alignItems: 'start',
              }}
            >
              {pageable?.content?.map((item) => {

                const itemIsRemoving = isRemoving && removingListingId === item.id;
                const hasPriceRange = item.minPrice !== item.maxPrice;

                return (
                  <Box component="article" key={item.id} sx={{ minWidth: 0 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: '#eeeae3',
                        aspectRatio: '3 / 4',
                      }}
                    >
                      <Link
                        to="/products/$listingId"
                        params={{ listingId: item.id }}
                        aria-label={`View ${item.productName}`}
                        style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
                      >
                        {item.imageLink ? (
                          <Box
                            component="img"
                            src={item.imageLink}
                            alt={item.productName}
                            sx={{
                              display: 'block',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 250ms ease',
                              '&:hover': { transform: 'scale(1.025)' },
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              px: 2,
                            }}
                          >
                            <Typography color="text.secondary">Image unavailable</Typography>
                          </Box>
                        )}
                      </Link>
                      {/*                                             
                                                    <IconButton
                                                        type="button"
                                                        aria-label={`Remove ${item.productName} from wishlist`}
                                                        title="Remove from wishlist"
                                                        onClick={() => removeWishlistItem(item.id)}
                                                        disabled={itemIsRemoving}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 10,
                                                            right: 10,
                                                            width: 38,
                                                            height: 38,
                                                            borderRadius: 10,
                                                            backgroundColor: 'hsla(38, 40%, 96%, 0.67)',
                                                            color: '#bd7a4a',
                                                            '&:hover': { backgroundColor: '#ffffff' },
                                                            '&.Mui-disabled': { backgroundColor: 'rgba(248, 245, 239, 0.8)' },
                                                        }}
                                                    >
                                                        {itemIsRemoving ? (
                                                            <CircularProgress size={18} color="inherit" />
                                                        ) : (
                                                            <FavoriteIcon sx={{ fontSize: 20 }} />
                                                        )}
                                                    </IconButton> */}

                    </Box>

                    <Box sx={{ pt: 1.5 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: 2,
                        }}
                      >
                        <Link
                          to="/products/$listingId"
                          params={{ listingId: item.id }}
                          style={{ minWidth: 0, color: 'inherit', textDecoration: 'none' }}
                        >
                          <Typography
                            sx={{
                              color: 'text.primary',
                              fontSize: '0.95rem',
                              lineHeight: 1.4,
                              '&:hover': {
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px',
                              },
                            }}
                          >
                            {item.productName}
                          </Typography>
                        </Link>

                        <Typography
                          sx={{
                            flexShrink: 0,
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            lineHeight: 1.4,
                          }}
                        >
                          {hasPriceRange
                            ? `${formatPrice(item.minPrice)} – ${formatPrice(item.maxPrice)}`
                            : formatPrice(item.minPrice)}
                        </Typography>
                      </Box>
                      <Breadcrumbs sx={{ py: 2 }} separator=">">
                        <Typography color="text.secondary">
                          {item.departmentCategory}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.clothingCategory}
                        </Typography>
                      </Breadcrumbs>



                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
        }}>
          {pageable?.content?.length === 0 ? (
            <Box></Box>
          ) : (
            <Pagination
              count={pageable?.totalPages}
              page={currentPage + 1}
              onChange={(event, page) => setCurrentPage(page - 1)}
              defaultPage={1}
              siblingCount={0}
              boundaryCount={2}
            />
          )}
        </Box>
      </Box>
    </div>
  )
}

export default ProductsPage;
