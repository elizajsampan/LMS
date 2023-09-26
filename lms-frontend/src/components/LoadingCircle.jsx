import { Backdrop, CircularProgress } from "@mui/material";
import * as React from "react";

export default function LoadingCircle() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={{
          color: "secondary.light",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
