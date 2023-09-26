import DeleteIcon from "@mui/icons-material/Delete";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Avatar,
  Box,
  // CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { CommentsContext } from "../context/comments/CommentsContext";
import { PostsContext } from "../context/posts/PostsContext";
import LoadingCircle from "./LoadingCircle";

const CommentCard = () => {
  // const navigate = useNavigate();
  const { loading: likeloading } = useContext(PostsContext);
  const { comments } = useContext(CommentsContext);
  const {
    loading: commentLoading,
    // comments,
    handleDeleteCommentStart,
  } = useContext(CommentsContext);
  const { userData } = useContext(AuthContext);

  const [isLoading] = useState(false);
  if (isLoading) {
    return <LoadingCircle />;
  }

  if (commentLoading) {
    return <LoadingCircle />;
  }

  if (likeloading) {
    return <LoadingCircle />;
  }
  if (comments) {
    if (comments.length !== 0) {
      return (
        <Stack spacing={1}>
          {comments ? (
            comments.map((c) => (
              <Grid key={c.comment_id} variant="outlined">
                <Divider sx={{ mt: 3 }} />
                <Box sx={{ mx: 6 }}>
                  <Grid item xs={12} mt={2} ml="64.5rem">
                    {userData.username === c.username ? (
                      <IconButton
                        onClick={() =>
                          handleDeleteCommentStart(c.post_id, c.comment_id)
                        }
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        <Tooltip title="Delete Comment" arrow>
                          <DeleteIcon color="primary" />
                        </Tooltip>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <CardHeader
                    sx={{ fontSize: 14, mt: -6 }}
                    color="text.secondary"
                    subheader={
                      <Chip
                        sx={{ fontSize: 14, mx: -7, mt: 10 }}
                        label={`@${c.username}`}
                        color="primary"
                        // onClick={() => navigate(`/profile/${c.username}`)}
                      />
                    }
                    avatar={
                      <Avatar
                        src={c.image_url}
                        sx={{ mx: -2 }}
                        // onClick={() => navigate(`/profile/${selectedPost.username}`)}
                      />
                    }
                  />
                  <CardContent
                    sx={{
                      bgcolor: grey[300],
                      borderRadius: 5,
                      width: "90%",
                      mx: 11,
                      mt: -11,
                    }}
                  >
                    <Typography
                      variant="body"
                      sx={{ mx: 3, wordBreak: "break-word" }}
                    >
                      {c.comment_content}
                    </Typography>
                  </CardContent>
                </Box>
              </Grid>
            ))
          ) : (
            <LoadingCircle />
          )}
        </Stack>
      );
    }
    return <></>;
  }
};

export default CommentCard;
