import { Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop = ({ loading }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={loading}
    >
      <CircularProgress color="secondary" size={"10vh"} />
    </Backdrop>
  );
};

export default LoadingBackdrop;
