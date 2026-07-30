import { Box, Collapse, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import type { ClothingCategory } from '../../models/Filter.ts';

const CATEGORIES = [
  'SHOP ALL',
  'JEAN',
  'PANT',
  'SHORT',
  'SHIRT',
  'SWEATER',
  'BAG',
  'SHOES',
  'HAT',
] as const;

type NavbarDrawerProps = {
  handleCategoryClick: (
    department: 'MENS' | 'WOMENS' | 'OTHER' | '',
    category: ClothingCategory | 'SHOP ALL',
  ) => void;
  open: boolean;
  onClose: () => void;
};

const NavbarDrawer = ({ handleCategoryClick, open, onClose }: NavbarDrawerProps) => {
  const [openMen, setOpenMen] = useState(false);
  const [openWomen, setOpenWomen] = useState(false);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280 }} role="presentation">
        <List>
          {/* MEN */}
          <ListItemButton onClick={() => setOpenMen((prev) => !prev)}>
            <ListItemText primary="Men" />
            {openMen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {CATEGORIES.map((cat) => (
                <ListItemButton
                  key={cat}
                  onClick={() => handleCategoryClick('MENS', cat)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={cat} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          {/* WOMEN */}
          <ListItemButton onClick={() => setOpenWomen((prev) => !prev)}>
            <ListItemText primary="Women" />
            {openWomen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openWomen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {CATEGORIES.map((cat) => (
                <ListItemButton
                  key={cat}
                  onClick={() => handleCategoryClick('WOMENS', cat)}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={cat} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          {/* Flat links */}
          <ListItemButton onClick={() => handleCategoryClick('OTHER', 'SHOP ALL')}>
            <ListItemText primary="Other" />
          </ListItemButton>
          <ListItemButton component={Link} onClick={() => onClose()} to="/products?deals=true">
            <ListItemText primary="Hot Deals" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default NavbarDrawer;
