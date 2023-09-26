import React from "react";
import {
  Grid,
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Typography,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { v4 as id } from "uuid";
import { CoursesContext } from "../context/courses/CoursesContext";
import Joi from "joi";
import { ThemeContext } from "../context/theme/ThemeContext";
import { grey } from "@mui/material/colors";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

const defaultFormValue = {
  courseId: id(),
  courseName: "",
  description: "",
  image: "",
};

const schema = Joi.object({
  courseName: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  image: Joi.allow(),
});

const CourseForm = ({ initialFormValue }) => {
  const navigate = useNavigate();
  const [convertedInitialFormValue] = useState(
    initialFormValue
      ? {
          courseId: initialFormValue.course_id,
          courseName: initialFormValue.course_name,
          description: initialFormValue.description,
          image: initialFormValue.image_url,
        }
      : null
  );

  const [form, setForm] = useState(
    convertedInitialFormValue ?? defaultFormValue
  );
  const [errors, setErrors] = useState();
  const [image, setImage] = useState(null);
  const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);

  const { handleAddCourse, handleEditCourse } = useContext(CoursesContext);

  const isFormInvalid = () => {
    const { courseId, ...otherFields } = form;
    const { error } = schema.validate(otherFields);

    return !!error;
  };

  const FileInput = styled("input")({
    display: "none",
  });

  const handleFileChange = ({ target }) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    const [file] = target.files;

    setImage(file);
  };

  const handleChange = ({ target: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({ ...errors, [input.name]: error.details[0].message });
      console.log(error);
    } else {
      const errorsInState = { ...errors };
      delete errorsInState[input.name];
      setErrors(errorsInState);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (initialFormValue) {
      try {
        handleEditCourse(id(), {
          courseId: form.courseId,
          courseName: form.courseName,
          description: form.description,
          image: image,
        });
        onShowToastNotification({
          message: "Successfully edited course",
          severity: "success",
        });
        navigate("/course");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        onShowToastNotification({
          message: "An unexpected error has occured",
          severity: "error",
        });
      }
    } else {
      try {
        handleAddCourse({
          courseId: id(),
          courseName: form.courseName,
          description: form.description,
          image: image,
        });
        onShowToastNotification({
          message: "Successfully added course",
          severity: "success",
        });
        navigate("/course");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        onShowToastNotification({
          message: "An unexpected error has occured",
          severity: "error",
        });
      }
    }
    setTimeout(() => {
      onHideToastNotification();
    }, 6000);
  };

  console.log(form);
  return (
    <Container>
      <Grid component={Paper} sx={{ bgcolor: grey[500] }}>
        <center>
          <Box
            component="form"
            sx={{
              marginTop: 5,
              marginBottom: 5,
            }}
            onSubmit={handleSubmit}
          >
            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <TextField
                variant="standard"
                fullWidth
                type="text"
                name="courseName"
                label="Course Name"
                onChange={handleChange}
                value={form.courseName}
                sx={{ width: 1000, marginTop: 3 }}
                defaultValue={form.courseName}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <TextField
                variant="standard"
                fullWidth
                type="text"
                name="description"
                label="Description"
                onChange={handleChange}
                value={form.description}
                sx={{ width: 1000 }}
                defaultValue={form.description}
              />
            </Grid>
            {convertedInitialFormValue ? (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  component="span"
                  sx={{ p: 1, width: 900, border: "1px dashed grey", mt: 4 }}
                >
                  <center>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      fontSize={15}
                    >
                      Change the course image
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      fontWeight="fontWeightLight"
                      fontSize={10}
                    >
                      Optional
                    </Typography>
                    <label htmlFor="icon-button-file">
                      <FileInput
                        onChange={handleFileChange}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      {image ? (
                        <Badge
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <IconButton onClick={() => setImage(null)}>
                              <CloseIcon />
                            </IconButton>
                          }
                        >
                          <IconButton component="span">
                            <Avatar
                              src={URL.createObjectURL(image)}
                              style={{
                                width: 40,
                                height: 40,
                              }}
                            />
                          </IconButton>
                        </Badge>
                      ) : (
                        <IconButton component="span">
                          <Avatar
                            sx={{ width: 40, height: 40 }}
                            src={convertedInitialFormValue.image}
                          />
                        </IconButton>
                      )}
                    </label>
                  </center>
                </Box>
              </Grid>
            ) : (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  component="span"
                  sx={{ p: 1, width: 900, border: "1px dashed grey", mt: 4 }}
                >
                  <center>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      fontSize={15}
                    >
                      Upload the course image
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      fontWeight="fontWeightLight"
                      fontSize={10}
                    >
                      Optional
                    </Typography>
                    <label htmlFor="icon-button-file">
                      <FileInput
                        onChange={handleFileChange}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      <IconButton component="span">
                        {image ? (
                          <Badge
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <IconButton onClick={() => setImage(null)}>
                                <CloseIcon />
                              </IconButton>
                            }
                          >
                            <IconButton component="span">
                              <Avatar
                                src={URL.createObjectURL(image)}
                                style={{
                                  width: 40,
                                  height: 40,
                                }}
                              />
                            </IconButton>
                          </Badge>
                        ) : (
                          <Avatar sx={{ width: 40, height: 40 }} />
                        )}
                      </IconButton>
                    </label>
                  </center>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sx={{ marginTop: 3 }}>
              <Button
                fullWidth
                type="submit"
                disabled={isFormInvalid() && convertedInitialFormValue}
                sx={{ ":hover": { bgcolor: "black", color: "white" } }}
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </center>
      </Grid>
    </Container>
  );
};

export default CourseForm;
