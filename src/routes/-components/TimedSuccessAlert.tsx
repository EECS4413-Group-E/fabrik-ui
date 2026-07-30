import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

function TimedSuccessAlert({ duration = 3000 }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <Collapse in={open}>
      <Alert variant="filled" severity="success">Added to cart!</Alert>
    </Collapse>
  );
}
export default TimedSuccessAlert;