import styled from "@emotion/styled";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
// import Joi from "joi";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { CommentsContext } from "../context/comments/CommentsContext";
import { PostsContext } from "../context/posts/PostsContext";
import { ThemeContext } from "../context/theme/ThemeContext";
import CommentCard from "./CommentCard";
import LoadingCircle from "./LoadingCircle";
import { v4 as idGenerator } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import EditIcon from "@mui/icons-material/Edit";

const defaultFormValue = {
  commentId: "",
  postId: "",
  userId: "",
  commentContent: "",
  postContent: "",
};

const PostView = ({ initialFormValue }) => {
  const navigate = useNavigate();

  const { selectedPost, handleDeletePostStart, handleEdit, loading } =
    useContext(PostsContext);
  const { fetchAllCommentsByPostId, handleResetComments, handleAddComment } =
    useContext(CommentsContext);
  const { userData } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [isEdit] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [convertedInitialFormValue] = useState(
    initialFormValue
      ? {
          postContent: initialFormValue.postContent,
          postImage: initialFormValue.postImage,
        }
      : null
  );
  const FileInput = styled("input")({
    display: "none",
  });

  useEffect(() => {
    if (selectedPost) {
      fetchAllCommentsByPostId(selectedPost.post_id);
    }
    return () => {
      handleResetComments();
    };
  }, [fetchAllCommentsByPostId, handleResetComments, selectedPost]);

  // console.log(selectedPost);
  const [form, setForm] = useState(
    convertedInitialFormValue ?? defaultFormValue
  );
  const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);

  const handleChange = ({ target: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });
  };

  // const schema = Joi.object({
  //   commentContent: Joi.string().min(1),
  // });
  // const isFormInvalid = () => {
  //   const { ...otherFields } = form;
  //   const { error } = schema.validate(otherFields);

  //   return !!error;
  // };

  //Edit with image

  const handleFileChange = ({ target }) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    const [file] = target.files;

    setPhoto(file);
  };

  // const removeImage = () => {
  //   setPhoto(null);
  // };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      handleEdit(selectedPost.post_id, {
        postContent: form.postContent,
        photo,
      });
      onShowToastNotification({
        message: "Successfully edited post",
        severity: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      onShowToastNotification({
        message: "An unexpected error has occured",
        severity: "error",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = {
      commentId: idGenerator(),
      userId: userData.user_id,
      postId: selectedPost.post_id,
      commentContent: form.commentContent,
    };

    try {
      await handleAddComment(formData, selectedPost.post_id);
      onShowToastNotification({
        message: "Successfully added Comment",
        severity: "success",
      });
      setTimeout(() => {
        onHideToastNotification();
      }, 1000);
      setLoading(false);
      navigate(`/posts/${selectedPost.post_id}`);
    } catch (error) {
      console.log(error.response);
      // Insert Error Here
      setLoading(false);
    }
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand,
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return <LoadingCircle />;
  }

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (selectedPost) {
    return (
      <>
        <Grid>
          <Card
            sx={{
              minWidth: 275,
              mt: "7%",
              backgroundColor: "secondary",
              borderRadius: 5,
            }}
          >
            <Grid item xs={12} mt={3} ml="69rem">
              <Tooltip title="Close Post" arrow>
                <IconButton
                  onClick={() => navigate("/community")}
                  sx={{ mx: -1, my: -2 }}
                >
                  <CloseIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </Grid>
            <CardHeader
              sx={{ fontSize: 20 }}
              color="text.secondary"
              avatar={<Avatar src={selectedPost.image_url} />}
              alt={selectedPost.first_name.charCodeAt(0)}
              title={selectedPost.first_name}
              subheader={`@${selectedPost.username}`}
            />
            <Divider />
            {selectedPost.post_image ? (
              <>
                <CardMedia component="img" image={selectedPost.post_image} />
                <Divider />
              </>
            ) : (
              <></>
            )}
            <CardContent>
              {isEdit ? (
                <>
                  {photo ? (
                    <>
                      <TextField
                        sx={{
                          width: "645px",
                          marginLeft: "30px",
                          marginTop: "20px",
                          borderRadius: "10px",
                        }}
                        id="standard-multiline-static"
                        rows={3}
                        variant="outlined"
                        onChange={handleChange}
                        value={selectedPost.post_content}
                        type="text"
                        name="postContent"
                      />
                      <Grid container alignItems="center" marginY={"10px"}>
                        <Grid item xs marginX="13px">
                          <label htmlFor="icon-button-file">
                            <FileInput
                              onChange={handleFileChange}
                              accept="image/*"
                              id="icon-button-file"
                              type="file"
                            />
                            <IconButton
                              variant="contained"
                              component="span"
                              color="secondary"
                            >
                              <AddPhotoAlternateIcon />
                            </IconButton>
                            <Typography variant="caption">Replace </Typography>
                          </label>
                        </Grid>
                        <Grid item marginX="13px">
                          <IconButton
                            variant="contained"
                            component="span"
                            onClick={() => handleSubmitEdit()}
                          >
                            <SendIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <TextField
                        sx={{
                          width: "645px",
                          marginLeft: "30px",
                          marginTop: "20px",
                          borderRadius: "10px",
                        }}
                        id="standard-multiline-static"
                        rows={3}
                        variant="outlined"
                        onChange={handleChange}
                        value={selectedPost.post_content}
                        type="text"
                        name="postContent"
                      />
                      <IconButton
                        variant="contained"
                        component="span"
                        onClick={() => handleSubmitEdit()}
                      >
                        <SendIcon />
                      </IconButton>
                    </>
                  )}
                </>
              ) : (
                <Typography variant="body" noWrap sx={{ mx: 3 }}>
                  <b>{selectedPost.post_content}</b>
                </Typography>
              )}
            </CardContent>
            {isEdit ? (
              <> </>
            ) : (
              <>
                {" "}
                <Divider />
                <CardActions>
                  {userData.username === selectedPost.username ? (
                    <>
                      {/* <IconButton
                        onClick={() => setIsEdit(true)}
                        variant="contained"
                        color="primary"
                        component="span"
                        sx={{ mx: 3 }}
                      >
                        <Tooltip title="Edit Post" arrow>
                          <EditIcon />
                        </Tooltip>
                      </IconButton> */}

                      <IconButton
                        onClick={() =>
                          handleDeletePostStart(selectedPost.post_id)
                        }
                        variant="contained"
                        color="primary"
                        component="span"
                        sx={{ mx: 3 }}
                      >
                        <Tooltip title="Delete Post" arrow>
                          <DeleteIcon />
                        </Tooltip>
                      </IconButton>
                    </>
                  ) : (
                    <></>
                  )}
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    sx={{ color: "primary.main", mx: 3 }}
                  >
                    <Tooltip title="Show Comments" arrow>
                      <CommentIcon ml="68rem" />
                    </Tooltip>
                  </ExpandMore>
                </CardActions>
                <Divider />
                <Collapse in={expanded} unmountOnExit>
                  <Grid>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      noWrap
                      marginTop={3}
                      marginLeft={5}
                      marginBottom={3}
                    >
                      Comments
                    </Typography>
                    <CommentCard />
                  </Grid>
                  <Divider variant="inset" sx={{ mt: 5 }} />
                  <Card>
                    <CardHeader
                      avatar={
                        <>
                          <Box display="flex" flexDirection="column">
                            <center>
                              <Avatar src={userData.image_url} sx={{ mx: 4 }} />{" "}
                              <Typography sx={{ fontSize: 14, mt: 0.8 }}>
                                @{userData.username}
                              </Typography>
                            </center>
                          </Box>
                        </>
                      }
                      sx={{ my: 3 }}
                      subheader={
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { width: 1 },
                            my: 3,
                            width: "95%",
                          }}
                        >
                          <TextField
                            id="outlined-textarea"
                            onChange={handleChange}
                            label="Add a comment here"
                            variant="outlined"
                            multiline
                            name="commentContent"
                            value={form.commentContent}
                            color="primary"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    // disabled={isFormInvalid()}
                                    onClick={(e) => handleSubmit(e)}
                                  >
                                    <Tooltip title="Post your comment" arrow>
                                      <SendIcon />
                                    </Tooltip>
                                  </IconButton>{" "}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      }
                    />
                  </Card>
                </Collapse>
              </>
            )}
          </Card>
        </Grid>
      </>
    );
  } else {
    return <LoadingCircle />;
  }
};

export default PostView;
