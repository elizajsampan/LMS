import React from "react";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TablePagination,
  Container,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { grey } from "@mui/material/colors";
import noImage from "../assets/no_image.jpg";
import { UserContext } from "../context/user/UserContext";

const UsersTable = ({ users }) => {
  const { handleDeleteUserStart } = useContext(UserContext);
  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(parseInt(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  if (!users) {
    return null;
  }
  return (
    <>
      <center>
        <Container>
          <Typography variant="h4" sx={{ mt: 1 }}>
            Users
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ bgcolor: grey[500], marginTop: 1, maxWidth: 1500 }}
            elevation="3"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <center>User ID</center>
                  </TableCell>
                  <TableCell>
                    <center>First Name</center>
                  </TableCell>
                  <TableCell>
                    <center>Last Name</center>
                  </TableCell>
                  <TableCell>
                    <center>Username</center>
                  </TableCell>
                  <TableCell>
                    <center>Email</center>
                  </TableCell>
                  <TableCell>
                    <center>Profile Picture</center>
                  </TableCell>
                  <TableCell>
                    <center>Role</center>
                  </TableCell>
                  <TableCell>
                    <center>Actions</center>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.user_id}>
                      <TableCell sx={{ wordBreak: "break-word" }}>
                        <center>{user.user_id}</center>
                      </TableCell>
                      <TableCell>
                        <center>{user.first_name}</center>
                      </TableCell>
                      <TableCell>
                        <center>{user.last_name}</center>
                      </TableCell>
                      <TableCell>
                        <center>{user.username}</center>
                      </TableCell>
                      <TableCell
                        component="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`mailto:${user.email}`}
                      >
                        <center>{user.email}</center>
                      </TableCell>
                      <TableCell>
                        <center>
                          <img
                            alt=""
                            src={user.image_url || noImage}
                            height="50"
                          />
                        </center>
                      </TableCell>
                      <TableCell>
                        <center>{user.role}</center>
                      </TableCell>
                      <TableCell>
                        <center>
                          <Grid container>
                            <Grid item xs={12}>
                              <Tooltip title="Delete User">
                                <IconButton
                                  onClick={() =>
                                    handleDeleteUserStart(user.user_id)
                                  }
                                  disabled={user.role === "admin"}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </center>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginBottom: 3 }}
          />
        </Container>
      </center>
    </>
  );
};

export default UsersTable;
