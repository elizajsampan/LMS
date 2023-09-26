import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { ThemeContext } from "../context/theme/ThemeContext";
import { ContentsContext } from "../context/contents/ContentsContext";

const DeleteContentConfirmationModal = () => {
  const {
    showDeleteContentConfirmationModal: open,
    handleDeleteContentConfirmationModalClose: onClose,
  } = useContext(ContentsContext);
  const { onHideToastNotification, onShowToastNotification } =
    useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirm Delete Content</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this content?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!loading && <Button onClick={() => onClose(false)}>Cancel</Button>}
        <LoadingButton
          loading={loading}
          onClick={async () => {
            setLoading(true);
            try {
              await onClose(true);
              window.location.reload(false);
              onShowToastNotification({
                message: "Successfully deleted content",
                severity: "success",
              });
              setTimeout(() => {
                onHideToastNotification();
              }, 6000);
            } catch (error) {
              const expectedError =
                error.response &&
                error.response.data &&
                error.response.status >= 400 &&
                error.response.status < 500;

              if (expectedError && error.response.status === 404) {
                onShowToastNotification({
                  message:
                    "Content not found. Content may have already been deleted.",
                  severity: "error",
                });
                setTimeout(() => {
                  onHideToastNotification();
                }, 6000);
              } else {
                onShowToastNotification({
                  message: "An unexpected error occurred",
                  severity: "error",
                });
                setTimeout(() => {
                  onHideToastNotification();
                }, 6000);
              }
              onClose(false);
            }
            setLoading(false);
          }}
          variant="contained"
          color="error"
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteContentConfirmationModal;
