import { useContext, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { PostsContext } from "../context/posts/PostsContext";
import { ThemeContext } from "../context/theme/ThemeContext";
import {
  Box,
  styled,
  TextField,
  Button,
  Avatar,
  Card,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Close } from "@mui/icons-material";
import { v4 as idGenerator } from "uuid";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const FileInput = styled("input")({
  display: "none",
});
const defaultFormValue = {
  postId: "",
  userId: "",
  postContent: "",
  photo: null,
};

function AddPost() {
  const [form, setForm] = useState(defaultFormValue);
  const [photo, setPhoto] = useState(null);
  const { userData } = useContext(AuthContext);
  const { handleAddPost } = useContext(PostsContext);
  const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });
  };

  const handleFileChange = ({ target }) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    const [file] = target.files;

    setPhoto(file);
  };

  const removeImage = () => {
    setPhoto(null);
  };

  const handleSubmit = async () => {
    const formData = {
      postId: idGenerator(),
      userId: userData.user_id,
      postContent: form.postContent,
      photo: photo,
    };
    try {
      await handleAddPost(formData);
      onShowToastNotification({
        message: "Successfully posted",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      onShowToastNotification({
        message: "Invalid inputs",
        severity: "error",
      });
    }
    setTimeout(() => {
      onHideToastNotification();
    }, 6000);
  };

  //   if (!userData) {
  //     return null;
  //   }
  const handleClose = () => {
    setLoading(false);
  };

  if (photo) {
    return (
      <Card
        sx={{
          marginTop: "10px",
          marginLeft: "60px",
          borderRadius: "10px",
          width: "700px",
          height: "auto",
        }}
        variant="elevation"
      >
        {/* <UserBox>
          <Avatar
            src=""
            sx={{
              width: 30,
              height: 30,
              marginLeft: "7px",
            }}
          />
        </UserBox> */}
        <Grid
          display="flex"
          flexDirection="column"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            alt={`${userData.first_name[0]}${userData.last_name[0]}`}
            src={userData.image_url}
            sx={{ height: 80, width: 80, mt: 3 }}
          />
          <Tooltip title={`${userData.first_name} ${userData.last_name}`}>
            <Typography marginTop="10px" variant="body1">
              <b>
                {userData.first_name}&nbsp;{userData.last_name}
              </b>
            </Typography>
          </Tooltip>
        </Grid>
        <center>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              border: "1px dashed grey",
              width: "50%",
              height: 350,
              mt: 2.5,
            }}
          >
            <img
              src={URL.createObjectURL(photo)}
              style={{
                width: "300px",
                height: "300px",
              }}
              alt=""
            />
          </Box>
          <IconButton
            onClick={() => removeImage(photo)}
            sx={{ marginTop: -87, marginLeft: 40 }}
          >
            <Close />
          </IconButton>
        </center>
        <TextField
          sx={{
            width: "645px",
            marginLeft: "30px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
          id="standard-multiline-static"
          rows={3}
          placeholder={"What's on your mind " + userData?.first_name + "?"}
          variant="standard"
          onChange={handleChange}
          value={form.postContent}
          type="text"
          name="postContent"
        />
        <Grid container alignItems="center" marginY={"10px"}>
          <Grid item xs marginX="25px">
            <label htmlFor="icon-button-file">
              <FileInput
                onChange={handleFileChange}
                accept="image/*"
                id="icon-button-file"
                type="file"
              />{" "}
              <Tooltip title="Replace Post Image">
                <IconButton
                  variant="contained"
                  component="span"
                  sx={{ color: "black" }}
                >
                  <PublishedWithChangesIcon fontSize="medium" />
                  <Typography variant="body2" sx={{ mt: 0.5, ml: 0.5 }}>
                    <b>Replace</b>
                  </Typography>
                </IconButton>
              </Tooltip>
            </label>
          </Grid>
          <Grid item marginX="13px">
            <Button
              onClick={() => handleSubmit()}
              sx={{
                width: "100px",
              }}
              variant="contained"
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Card>
    );
  }
  return (
    <Card
      sx={{
        marginTop: "10px",
        marginLeft: "60px",
        borderRadius: "10px",
        width: "700px",
        height: "125px",
      }}
      variant="elevation"
    >
      <UserBox>
        <Avatar
          src={userData?.image_url}
          sx={{ width: 40, height: 40, marginLeft: "10px", marginTop: "10px" }}
        />
      </UserBox>
      <TextField
        sx={{
          width: "615px",
          marginLeft: "60px",
          marginTop: "-50px",
          borderRadius: "10px",
        }}
        id="standard-multiline-static"
        rows={3}
        placeholder={"What's on your mind " + userData?.first_name + "?"}
        variant="standard"
        onChange={handleChange}
        value={form.postContent}
        type="text"
        name="postContent"
      />
      <Grid container alignItems="center" marginY={"-30px"}>
        <Grid item xs marginX="13px">
          <label htmlFor="icon-button-file">
            <FileInput
              onChange={handleFileChange}
              accept="image/*"
              id="icon-button-file"
              type="file"
            />
            <Tooltip title="Add Post Image">
              <IconButton
                variant="contained"
                component="span"
                sx={{ color: "black" }}
              >
                <AddPhotoAlternateIcon fontSize="medium" />
                <Typography variant="body2" sx={{ mt: 0.5, ml: 0.5 }}>
                  <b>Add Image</b>
                </Typography>
              </IconButton>
            </Tooltip>
          </label>
        </Grid>

        <Grid item marginX="13px">
          <Button
            onClick={() => handleSubmit()}
            sx={{
              width: "100px",
            }}
            variant="contained"
          >
            Post
          </Button>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" size={"10vh"} />
          </Backdrop>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AddPost;
