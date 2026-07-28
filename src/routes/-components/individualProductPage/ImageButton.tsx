import { ToggleButton } from '@mui/material';
import type { ProductImage } from '../../../models/Listing';

export default function ImageButton({
  imageSet,
  imageIndex,
  setSelectedIndex,
}: {
  imageSet: ProductImage[];
  imageIndex: number;
  setSelectedIndex: (image: ProductImage) => void;
}) {
  return (

      <ToggleButton
        value = {imageSet[imageIndex]?.imageLink}
        onChange={() => setSelectedIndex(imageSet[imageIndex])}
        sx={{
          width: 120,
          height: 160,
          padding: 0,
          borderRadius: 0,
          overflow: 'hidden',
        }}
      >
        {imageSet[imageIndex]?.imageLink && (
          <img
            src={imageSet[imageIndex]?.imageLink}
            alt={imageSet[imageIndex]?.id}
            width={100}
            height={160}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </ToggleButton>

  );
}
