import React, { useContext, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Stack,
  Button,
  Tooltip,
  Divider,
} from "@mui/material";
import { PostsContext } from "../context/posts/PostsContext";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth/AuthContext";

const PostStack = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const { postsUser } = useContext(PostsContext);
  const [, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickViewPost = async (p) => {
    if (authToken) {
      await navigate(`/posts/${p.post_id}`);
    } else navigate("/login");
  };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  //   console.log(postsUser);
  const postUserReverse = postsUser
    .slice(0)
    .reverse()
    .map((element) => {
      return element;
    });

  if (!postUserReverse) {
    return null;
  }

  return (
    <Stack spacing={1}>
      {postUserReverse.map((p) => (
        <Grid key={p.post_id}>
          <Card
            sx={{
              margin: 2,
              marginLeft: "60px",
              borderRadius: "10px",
              width: "700px",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt={`${p.username[0]}${p.last_name[0]}`}
                  src={p.image_url}
                  sx={{ width: 40, height: 40 }}
                />
              }
              action={
                <IconButton
                  aria-label="settings"
                  onClick={handleClick}
                  size="medium"
                ></IconButton>
              }
              title={<Typography fontSize={14}>{p.username}</Typography>}
            />

            <CardMedia component="img" height="20%" src={p.imageUrl} />
            <CardContent>
              <Typography variant="body2" color="text.secondary" fontSize={14}>
                {p.post_content}
              </Typography>
            </CardContent>

            {/* <CardActions disableSpacing>
              <Badge badgeContent={p?.commentsCount} color="info">
                <Checkbox size="1.5rem" />
              </Badge>
            </CardActions> */}

            {/* with images */}
            {p.post_image ? (
              <>
                <Divider />
                <CardMedia component="img" height="200" image={p.post_image} />
                <Divider />
              </>
            ) : (
              <></>
            )}
            <CardContent onClick={() => navigate(`/posts/${p.post_id}`)}>
              <Typography variant="body2" color="text.secondary" noWrap>
                {p.postContent}
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="View Post" arrow>
                <Button onClick={() => handleClickViewPost(p)}>
                  View Post
                </Button>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Stack>
  );
};

export default PostStack;
