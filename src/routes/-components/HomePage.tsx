import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Typography } from '@mui/material';

import { listingsQueryOptions } from '../../queries';
import { fabrikColors } from '../../theme';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeProductCard from './HomeProductCard';
import type { DepartmentCategory } from '../../models/Filter';

const PRODUCTS_SEARCH_DEFAULTS = {
  keyword: '',
  pageNumber: 0,
  pageSize: 10,
  department: '' as never,
  category: '' as never,
  deals: false,
};

const DEPARTMENTS = [
  { label: 'Mens', image: '/category-men.jpg' },
  { label: 'Womens', image: '/category-women.jpg' },
  { label: 'Other', image: '/category-other.jpg' },
] as const;

const productGridSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: '1fr 1fr',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
  },
  gap: 3,
} as const;

const HomePage = () => {
  const { data: listings, isLoading } = useQuery(listingsQueryOptions());

  const allListings = listings ?? [];

  const hotDeals = allListings.filter(
    (listing) => (listing.discountPercentage ?? 0) > 0,
  );

  const featured = allListings.slice(0, 8);

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 420, md: 560 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ px: 3 }}>
          <Typography variant="h1" sx={{ color: '#fff', mb: 2 }}>
            Fabrik
          </Typography>

          <Typography sx={{ mb: 4, letterSpacing: '0.08em' }}>
            Considered clothing for everyday wear
          </Typography>

          <Link
            to="/products"
            search={PRODUCTS_SEARCH_DEFAULTS}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" size="large" sx={{ px: 5, py: 1.5 }}>
              Shop the Collection
            </Button>
          </Link>
        </Box>
      </Box>
      {/* Categories */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 6 }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Shop by Category
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 8,
          }}
        >
          {DEPARTMENTS.map((department) => (
            <Link
              key={department.label}
              to="/products"
              search={{ ...PRODUCTS_SEARCH_DEFAULTS, department: department.label.toUpperCase() as DepartmentCategory }}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: 600,
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'left',
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${department.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.02)' 
                  }
                  ,
                }}
              >

                <Typography variant="h1" sx={{ color: 'white', mb: 2, ml: 3 }}>
                  {department.label}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>

        {hotDeals.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Typography variant="h2" sx={{ color: fabrikColors.terracotta }}>
                Hot Deals
              </Typography>

              <Link
                to="/products"
                search={{ ...PRODUCTS_SEARCH_DEFAULTS, deals: true }}
                style={{ textDecoration: 'none' }}
              >
                <Button>
                  View all 
                  <NavigateNextIcon />
                </Button>
              </Link>
            </Box>

            <Box sx={productGridSx}>
              {hotDeals.map((listing) => (
                <HomeProductCard key={listing.id} listing={listing} />
              ))}
            </Box>
          </Box>
        )}

        <Typography variant="h2" sx={{ mb: 3 }}>
          New Arrivals
        </Typography>

        {isLoading ? (
          <Typography>Loading collection...</Typography>
        ) : featured.length === 0 ? (
          <Typography>No products available yet.</Typography>
        ) : (
          <Box sx={productGridSx}>
            {featured.map((listing) => (
              <HomeProductCard key={listing.id} listing={listing} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;