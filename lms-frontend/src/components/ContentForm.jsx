import React from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Container,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Joi from "joi";
import { v4 as id } from "uuid";
import { ThemeContext } from "../context/theme/ThemeContext";
import { ContentsContext } from "../context/contents/ContentsContext";
import { grey } from "@mui/material/colors";
import { CoursesContext } from "../context/courses/CoursesContext";

const defaultFormValue = {
  contentId: id(),
  courseId: "",
  contentTitle: "",
  videoContent: "",
  lessonNum: "",
};

const schema = Joi.object({
  courseId: Joi.string().min(1).required(),
  contentTitle: Joi.string().min(1).required(),
  videoContent: Joi.string().min(1).required(),
  lessonNum: Joi.string().min(1).required(),
});

const ContentForm = ({ initialFormValue }) => {
  const navigate = useNavigate();
  const [convertedInitialFormValue] = useState(
    initialFormValue
      ? {
          contentId: initialFormValue.content_id,
          courseId: initialFormValue.course_id,
          contentTitle: initialFormValue.content_title,
          videoContent: initialFormValue.video_content,
          lessonNum: initialFormValue.lesson_num.toString(),
        }
      : null
  );
  const [form, setForm] = useState(
    convertedInitialFormValue ?? defaultFormValue
  );
  const [errors, setErrors] = useState();

  const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);
  const { handleAddContent, handleEditContent } = useContext(ContentsContext);
  const { courses } = useContext(CoursesContext);

  const isFormInvalid = () => {
    const { contentId, ...otherFields } = form;
    const { error } = schema.validate(otherFields);
    console.log(error);
    return !!error;
  };

  const handleBlur = ({ target: input }) => {
    setForm({ ...form, courseId: input.value });
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
    console.log(error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (initialFormValue) {
      try {
        handleEditContent(id(), {
          contentId: form.contentId,
          courseId: form.courseId,
          contentTitle: form.contentTitle,
          videoContent: form.videoContent,
          lessonNum: form.lessonNum,
        });
        onShowToastNotification({
          message: "Successfully edited course content",
          severity: "success",
        });
        navigate("/content");
      } catch (error) {
        onShowToastNotification({
          message: "An unexpected error has occured",
          severity: "error",
        });
      }
      setTimeout(() => {
        onHideToastNotification();
      }, 6000);
    } else {
      try {
        handleAddContent({
          contentId: id(),
          courseId: form.courseId,
          contentTitle: form.contentTitle,
          videoContent: form.videoContent,
          lessonNum: form.lessonNum,
        });
        onShowToastNotification({
          message: "Successfully added course content",
          severity: "success",
        });
        navigate("/content");
      } catch (error) {
        onShowToastNotification({
          message: "An unexpected error has occured",
          severity: "error",
        });
      }
      setTimeout(() => {
        onHideToastNotification();
      }, 6000);
    }
  };

  if (!courses) {
    return null;
  }

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
            <Grid
              item
              xs={12}
              display="d-flex"
              flexDirection="row"
              justifyContent="center"
              sx={{ marginTop: 1 }}
            >
              <br />
              <FormControl fullWidth sx={{ marginTop: 1 }}>
                <InputLabel variant="outlined">Course Name</InputLabel>
                <Select
                  value={form.courseId}
                  label="Course Name"
                  onChange={handleChange}
                  name="courseId"
                  sx={{ width: "250px" }}
                  onBlur={handleBlur}
                  defaultValue={form.courseId}
                >
                  {courses.map((c, index) => (
                    <MenuItem key={index} value={c.courseId}>
                      {c.courseName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <TextField
                variant="standard"
                type="text"
                name="contentTitle"
                label="Content Title"
                onChange={handleChange}
                value={form.contentTitle}
                sx={{ width: 1000 }}
                defaultValue={form.contentTitle}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <TextField
                variant="standard"
                type="text"
                name="videoContent"
                label="Video Content"
                onChange={handleChange}
                value={form.videoContent}
                sx={{ width: 1000 }}
                defaultValue={form.videoContent}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <TextField
                variant="standard"
                type="text"
                name="lessonNum"
                label="Lesson Number"
                onChange={handleChange}
                value={form.lessonNum}
                sx={{ width: 1000 }}
              />
            </Grid>

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

export default ContentForm;
