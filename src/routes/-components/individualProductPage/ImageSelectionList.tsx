import { Box, IconButton, styled, ToggleButtonGroup, toggleButtonGroupClasses } from '@mui/material';
import type { ProductImage } from '../../../models/Listing';
import { useEffect, useRef, useState } from 'react';
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

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      border: `100px solid black`,
      [`&.${toggleButtonGroupClasses.selected}`]: {
        color: 'white',
        backgroundColor: 'black',
        border: `4px solid black`,

      },
      [`&:not(.${toggleButtonGroupClasses.selected})`]: {
        color: 'black',
        border: `0px solid black`,

      },
    },
  }));      

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const selectedEl = container.querySelector<HTMLElement>('.Mui-selected');
    if (!selectedEl) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = selectedEl.getBoundingClientRect();

    const offset =
      elRect.left -
      containerRect.left +
      container.scrollLeft -
      container.clientWidth / 2 +
      elRect.width / 2;

    container.scrollTo({ left: offset, behavior: 'smooth' });
  }, [selectedImage]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
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
        <StyledToggleButtonGroup
          value={selectedImage}
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
        </StyledToggleButtonGroup>
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