import { Box, IconButton, ToggleButtonGroup } from '@mui/material';
import type { ProductImage } from '../../../models/Listing';
import { useRef, useState } from 'react';
import ImageButton from './ImageButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ImageSelectionList({
  availableImages,
  selectedImage,
  handleImageSelection,
}: {
  availableImages: ProductImage[];
  selectedImage: string;
  handleImageSelection: (image: ProductImage) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(
    availableImages.findIndex((img) => img.imageLink === selectedImage),
  );

  const getSelectedImage = () => {
    return availableImages.findIndex((img) => img.imageLink === selectedImage);
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    // If the wheel movement is mostly vertical, redirect it horizontally
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <IconButton
        onClick={() => {
          const newIndex =
            (getSelectedImage() - 1 + availableImages.length) % availableImages.length;
          setSelectedIndex(newIndex);
          handleImageSelection(availableImages[newIndex]);
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Box
        ref={scrollRef}
        onWheel={handleWheel}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          maxWidth: 600,
          my: 2,
          height: 160,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none', 
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <ToggleButtonGroup
          value={selectedIndex}
          exclusive
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          {availableImages.map((image, index) => (
            <ImageButton
              key={image.id}
              imageSet={availableImages}
              imageIndex={index}
              setSelectedIndex={handleImageSelection}
            />
          ))}
        </ToggleButtonGroup>
      </Box>
      <IconButton
        onClick={() => {
          const newIndex = (getSelectedImage() + 1) % availableImages.length;
          setSelectedIndex(newIndex);
          handleImageSelection(availableImages[newIndex]);
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}