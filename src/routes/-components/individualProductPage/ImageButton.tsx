import { ToggleButton } from '@mui/material';
import type { ProductImage } from '../../../models/Listing';

export default function ImageButton({
  image,
  setSelectedIndex,
}: {
  image: ProductImage
  setSelectedIndex: (image: ProductImage) => void;
}) {
  return (

      <ToggleButton
        value = {image.imageLink}
        onChange={() => setSelectedIndex(image)}
        sx={{
          width: 120,
          height: 160,
          padding: 0,
          borderRadius: 0,
          overflow: 'hidden',
          border: '1px solid black',
        }}
      >
        {image.imageLink && (
          <img
            src={image.imageLink}
            alt={image.id}
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
