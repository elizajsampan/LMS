import {
  Avatar,
  Box,
  Divider,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";

const EditProfileSidebar2 = () => {
  const { userData } = useContext(AuthContext);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <Box
      component={Paper}
      width={"20%"}
      height="730px"
      sx={{ bgcolor: "white", marginLeft: -3, marginTop: -2 }}
      elevation="3"
    >
      <List>
        <ListItem>
          <center>
            <ListItemIcon>
              <Grid container display="flex" flexDirection="row">
                <Grid item xs={12}>
                  <Avatar
                    alt={`${userData.first_name[0]}${userData.last_name[0]}`}
                    src={userData.image_url}
                    sx={{ height: 80, width: 80 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Tooltip
                    title={`${userData.first_name} ${userData.last_name}`}
                  >
                    <Typography marginTop="10px" variant="body1">
                      <b>
                        {userData.first_name}&nbsp;{userData.last_name}
                      </b>
                    </Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </ListItemIcon>
          </center>
        </ListItem>
        <Divider />
        <ListItem component="a" href="/edit-profile/profile" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon>person</Icon>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          component="a"
          href="/edit-profile/security"
          disablePadding
          onClick={handleClick}
          sx={{
            backgroundColor: !clicked ? "gray" : "white",
            color: !clicked ? "white" : "black",
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Icon>security</Icon>
            </ListItemIcon>
            <ListItemText primary="Account Security" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
};

export default EditProfileSidebar2;
