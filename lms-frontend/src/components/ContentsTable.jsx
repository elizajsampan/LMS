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
import { ContentsContext } from "../context/contents/ContentsContext";
import { grey } from "@mui/material/colors";

const ContentsTable = ({ contents, courses }) => {
  const navigate = useNavigate();
  const { handleDeleteContentStart } = useContext(ContentsContext);

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

  if (!contents) {
    return null;
  }

  return (
    <>
      <center>
        <Container>
          <Typography variant="h4" sx={{ mt: 1 }}>
            Contents
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: grey[500],
              marginTop: 1,
              marginLeft: -6,
              maxWidth: 1500,
            }}
            elevation="3"
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <center>Content ID</center>
                  </TableCell>
                  <TableCell>
                    <center>Course Name</center>
                  </TableCell>
                  <TableCell>
                    <center>Content Title</center>
                  </TableCell>
                  <TableCell>
                    <center>Video Content</center>
                  </TableCell>
                  <TableCell>
                    <center>Lesson Number</center>
                  </TableCell>
                  <TableCell>
                    <center>Actions</center>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((content) => (
                    <TableRow key={content.id}>
                      <TableCell>
                        <center>{content.contentId}</center>
                      </TableCell>
                      <TableCell>
                        {courses.map((course) => {
                          if (course.courseId === content.courseId) {
                            return (
                              <Typography>
                                <center>{course.courseName}</center>
                              </Typography>
                            );
                          }
                          return <></>;
                        })}
                      </TableCell>
                      <TableCell>
                        <center>{content.contentTitle}</center>
                      </TableCell>
                      <TableCell
                        component="a"
                        href={content.videoContent}
                        target="_blank"
                      >
                        <center>{content.videoContent}</center>
                      </TableCell>
                      <TableCell>
                        <center>{content.lessonNum}</center>
                      </TableCell>

                      <TableCell>
                        <center>
                          <Grid container>
                            <Grid item xs={6}>
                              <Tooltip title="Edit Content">
                                <IconButton
                                  onClick={() =>
                                    navigate(
                                      `/edit-content/${content.contentId}`
                                    )
                                  }
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item xs={6}>
                              <Tooltip title="Delete Content">
                                <IconButton
                                  onClick={() =>
                                    handleDeleteContentStart(content.contentId)
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
            count={contents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginBottom: 3, mr: 3 }}
          />
        </Container>
      </center>
    </>
  );
};

export default ContentsTable;
