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
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import { useContext } from "react";
import { grey } from "@mui/material/colors";
import noImage from "../assets/no_image.jpg";
import { CoursesContext } from "../context/courses/CoursesContext";

const CoursesTable = ({ courses }) => {
  const navigate = useNavigate();
  const { handleDeleteCourseStart } = useContext(CoursesContext);

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

  if (!courses) {
    return null;
  }
  return (
    <>
      <center>
        <Container>
          <Typography variant="h4" sx={{ mt: 1 }}>
            Courses
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
                    <center>Course ID</center>
                  </TableCell>
                  <TableCell>
                    <center>Course Name</center>
                  </TableCell>
                  <TableCell>
                    <center>Course Description</center>
                  </TableCell>
                  <TableCell>
                    <center>Course Image</center>
                  </TableCell>
                  <TableCell>
                    <center>Actions</center>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((course) => (
                    <TableRow key={course.courseId}>
                      <TableCell>
                        <center>{course.courseId}</center>
                      </TableCell>
                      <TableCell>
                        <center>{course.courseName}</center>
                      </TableCell>
                      <TableCell>{course.description}</TableCell>
                      <TableCell>
                        <center>
                          <img
                            alt=""
                            src={course.imageUrl || noImage}
                            height="50"
                          />
                        </center>
                      </TableCell>
                      <TableCell>
                        <center>
                          <Grid container>
                            <Grid item xs={6}>
                              <Tooltip title="Edit Course">
                                <IconButton
                                  onClick={() =>
                                    navigate(`/edit-course/${course.courseId}`)
                                  }
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item xs={6}>
                              <Tooltip title="Delete Course">
                                <IconButton
                                  onClick={() =>
                                    handleDeleteCourseStart(course.courseId)
                                  }
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
            count={courses.length}
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

export default CoursesTable;
