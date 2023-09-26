import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
} from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { PostsContext } from "../context/posts/PostsContext";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const username = localStorage.getItem("userData.username");
  const { handleDeletePostStart: onDelete } = useContext(PostsContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const profileMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!username) {
    // return null;
  }

  if (!post) {
    // return null;
  }
  return (
    <>
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
            <Avatar src={post?.user?.imageUrl} sx={{ width: 40, height: 40 }} />
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={handleClick}
              size="medium"
            ></IconButton>
          }
          title={<Typography fontSize={14}>{post?.user?.name}</Typography>}
        />
        <CardMedia component="img" height="20%" src={post?.imageUrl} />
        <CardContent>
          <Typography variant="body2" color="text.secondary" fontSize={14}>
            {post?.value}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Badge badgeContent={post?.commentsCount} color="info">
            <Checkbox size="1.5rem" />
          </Badge>
        </CardActions>
      </Card>
      {username === post?.user?.username ? (
        <Menu
          anchorEl={anchorEl}
          open={profileMenu}
          id="account-menu"
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => onDelete(post.id)}>
            <ListItemIcon></ListItemIcon>
            <Typography fontSize={10}>Delete</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => navigate(`/posts/${post.id}`)}>
            <ListItemIcon></ListItemIcon>
            <Typography fontSize={10}>View Details</Typography>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          open={profileMenu}
          id="account-menu"
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate(`/posts/${post.id}`)}>
            <ListItemIcon></ListItemIcon>
            <Typography fontSize={10}>View Details</Typography>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}

export default Post;
