import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

function TimedErrorAlert({ duration = 3000 }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <Collapse in={open}>
      <Alert variant="filled" severity="error">Something went wrong.</Alert>
    </Collapse>
  );
}
export default TimedErrorAlert;