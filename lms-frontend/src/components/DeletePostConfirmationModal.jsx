import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../context/posts/PostsContext";
import { ThemeContext } from "../context/theme/ThemeContext";

const DeletePostConfirmationModal = () => {
  const navigate = useNavigate();
  const {
    showDeletePostConfirmationModal: open,
    handleDeletePostConfirmationModalClose: onClose,
  } = useContext(PostsContext);
  const { onHideToastNotification, onShowToastNotification } =
    useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirm Delete Post</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!loading && <Button onClick={() => onClose(false)}>Cancel</Button>}
        <Button
          loading={loading}
          onClick={async () => {
            setLoading(true);
            try {
              await onClose(true);
              onShowToastNotification({
                message: "Successfully deleted post",
                severity: "success",
              });
              setTimeout(() => {
                onHideToastNotification();
              }, 1000);
              navigate("/community");
            } catch (error) {
              const expectedError =
                error.response &&
                error.response.data &&
                error.response.status >= 400 &&
                error.response.status < 500;

              if (expectedError && error.response.status === 404) {
                onShowToastNotification({
                  message:
                    "Post not found. Post may have already been deleted.",
                  severity: "error",
                });
                setTimeout(() => {
                  onHideToastNotification();
                }, 1000);
              } else {
                onShowToastNotification({
                  message: "An unexpected error occurred",
                  severity: "error",
                });
                setTimeout(() => {
                  onHideToastNotification();
                }, 1000);
              }

              onClose(false);
            }

            setLoading(false);
          }}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostConfirmationModal;
