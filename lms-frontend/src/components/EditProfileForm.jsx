import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Joi from "joi";
import { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/auth/AuthContext";
import CloseIcon from "@mui/icons-material/Close";

const EditProfileForm = () => {
  const { userData } = useContext(AuthContext);
  const schema = Joi.object({
    first_name: Joi.string().max(50).required().messages({
      "string.empty": `First Name is required`,
      "string.max": `First Name is limited to 50 characters`,
    }),
    last_name: Joi.string().max(50).required().messages({
      "string.empty": `Last Name is required`,
      "string.max": `Last Name is limited to 50 characters`,
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": `Email is required`,
        "string.email": `Email should be valid one`,
      }),
    username: Joi.string().min(5).max(15).required().messages({
      "string.empty": `Email is required`,
      "string.max": `Username is limited to 15 characters`,
      "string.min": `Username should contain at least 5 characters`,
    }),
    image_url: Joi.allow(),
  });

  const [form, setForm] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    username: userData.username,
    image_url: userData.image_url,
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [showImageUrl, setShowImageUrl] = useState(true);
  const { handleEditUserData } = useContext(AuthContext);

  const isFormInvalid = () => {
    const { id, ...otherFields } = form;
    const { error } = schema.validate(otherFields);
    console.log(error);
    return !!error;
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
      const { details } = error;
      const [firstError] = details;

      setErrors({
        ...errors,
        [input.name]: firstError.message,
      });
    } else {
      const errorsInState = { ...errors };
      delete errorsInState[input.name];

      setErrors(errorsInState);
    }
  };

  const handleFileChange = ({ target }) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    const [file] = target.files;

    setImage(file);
  };

  const FileInput = styled("input")({
    display: "none",
  });

  const handleSubmit = async (event) => {
    await handleEditUserData({
      firstName: form.first_name,
      lastName: form.last_name,
      username: form.username,
      email: form.email,
      // userId: form.userId,
      // password: form.password,
      image: image,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Box
      component={Paper}
      elevation="3"
      sx={{ marginTop: -2, width: 1000, marginLeft: 0 }}
    >
      <Grid xs={12} marginBottom="15px">
        <center>
          <Typography variant="h6" marginTop="20px">
            Public Profile
          </Typography>
          <Typography variant="body1" marginTop="10px">
            Edit your profile information
          </Typography>
        </center>
      </Grid>
      <Divider />
      <Grid
        // component="form"
        marginTop={3}
        marginLeft={15}
        // onSubmit={handleSubmit}
      >
        <Typography variant="body1">
          <b>Basics:</b>
        </Typography>
        <Grid container component="form">
          <Grid item xs={8}>
            <TextField
              error={!!errors.first_name}
              value={form.first_name}
              onChange={handleChange}
              margin="normal"
              label="First Name"
              type="text"
              name="first_name"
              variant="outlined"
              InputProps={{ style: { fontSize: 13.5 } }}
              InputLabelProps={{ style: { fontSize: 13.5 } }}
              sx={{ width: 750 }}
              defaultValue={form.first_name}
              helperText={errors.first_name ?? "\u00a0"}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              error={!!errors.last_name}
              value={form.last_name}
              onChange={handleChange}
              margin="normal"
              label="Last Name"
              type="text"
              name="last_name"
              variant="outlined"
              InputProps={{ style: { fontSize: 13.5 } }}
              InputLabelProps={{ style: { fontSize: 13.5 } }}
              sx={{ width: 750 }}
              defaultValue={form.last_name}
              helperText={errors.last_name ?? "\u00a0"}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              error={!!errors.username}
              value={form.username}
              onChange={handleChange}
              margin="normal"
              label="Username"
              type="text"
              name="username"
              variant="outlined"
              InputProps={{ style: { fontSize: 13.5 } }}
              InputLabelProps={{ style: { fontSize: 13.5 } }}
              sx={{ width: 750 }}
              defaultValue={form.username}
              helperText={errors.username ?? "\u00a0"}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              error={!!errors.email}
              value={form.email}
              onChange={handleChange}
              margin="normal"
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              InputProps={{ style: { fontSize: 13.5 } }}
              InputLabelProps={{ style: { fontSize: 13.5 } }}
              sx={{ width: 750 }}
              defaultValue={form.email}
              helperText={errors.email ?? "\u00a0"}
            />
          </Grid>

          <Box component="span" sx={{ p: 1, width: 900 }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component="span"
                sx={{
                  p: 1,
                  width: 300,
                  border: "1px dashed gray",
                  mt: 0,
                  marginLeft: -13,
                }}
              >
                <center>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    fontSize={15}
                  >
                    Change your profile picture
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
                          <IconButton
                            onClick={() => {
                              setImage(null);
                            }}
                          >
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
                      <Badge
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <IconButton
                            onClick={() => {
                              setImage(null);
                              setShowImageUrl(false);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        }
                      >
                        <IconButton component="span">
                          <Avatar
                            src={showImageUrl ? userData.image_url : ""}
                            style={{
                              width: 40,
                              height: 40,
                            }}
                          />
                        </IconButton>
                      </Badge>
                    )}
                  </label>
                </center>
              </Box>
              <Grid
                xs={12}
                display="d-flex"
                flexDirection="row"
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  // type="submit"
                  onClick={() => handleSubmit()}
                  disabled={isFormInvalid()}
                  sx={{
                    bgcolor: "black",
                    marginTop: 3,
                    marginLeft: -13,
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfileForm;
