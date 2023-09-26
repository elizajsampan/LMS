import {
  Button,
  Container,
  List,
  Paper,
  Box,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <center>
        <Box
          component={Paper}
          display="d-flex"
          flexDirection="column"
          alignContent="center"
          justifyContent="center"
          sx={{
            bgcolor: "gray",
            marginTop: 5,
            marginBottom: 5,
            opacity: "90%",
          }}
          elevation="6"
          width={300}
        >
          <List>
            <Typography variant="h6" color="aqua">
              Admin Menu
            </Typography>
            <ListItem>
              <Button
                variant="contained"
                sx={{ marginLeft: 0.5 }}
                onClick={() => navigate("/add-course")}
              >
                Add Course
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                onClick={() => navigate("/add-content")}
              >
                Add Content
              </Button>
            </ListItem>
          </List>
        </Box>
      </center>
    </Container>
  );
};

export default AdminMenu;
